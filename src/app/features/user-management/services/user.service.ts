import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserStatus } from '../models/user.model';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    // Initialize with mock data
    this.generateMockUsers(50);
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(user => user.id === id)).pipe(delay(300));
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: this.getNextId(),
      createdAt: new Date()
    };

    this.users.push(newUser);
    this.usersSubject.next(this.users);
    return of(newUser).pipe(delay(300));
  }

  updateUser(id: number, userData: Partial<User>): Observable<User> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData };
      this.usersSubject.next(this.users);
      return of(this.users[index]).pipe(delay(300));
    }
    throw new Error('User not found');
  }

  deleteUser(id: number): Observable<boolean> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.usersSubject.next(this.users);
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  changeUserStatus(id: number, status: UserStatus): Observable<User> {
    return this.updateUser(id, { status });
  }

  searchUsers(query: string): Observable<User[]> {
    query = query.toLowerCase().trim();
    return this.getUsers().pipe(
      map(users => users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
      ))
    );
  }

  filterUsers(filters: { [key: string]: any }): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => users.filter(user => {
        let match = true;

        for (const key in filters) {
          if (filters[key] && user[key as keyof User] !== undefined) {
            if (typeof user[key as keyof User] === 'string') {
              match = match && (user[key as keyof User] as string).toLowerCase().includes(filters[key].toLowerCase());
            } else {
              match = match && user[key as keyof User] === filters[key];
            }
          }
        }

        return match;
      }))
    );
  }

  private getNextId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map(user => user.id)) + 1
      : 1;
  }

  private generateMockUsers(count: number): void {
    const roles = ['Admin', 'User', 'Manager', 'Editor'];
    const statuses: UserStatus[] = ['active', 'inactive'];

    for (let i = 1; i <= count; i++) {
      this.users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        phone: `+267 ${Math.floor(Math.random() * 10000000) + 70000000}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000),
        lastLogin: Math.random() > 0.2
          ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
          : undefined
      });
    }
  }
}
