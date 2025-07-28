import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Store the email during the two-step authentication process
  private tempEmail: string | null = null;

  constructor(private http: HttpClient) {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Step 1: Validate email
  validateEmail(email: string): Observable<boolean> {
    // In a real app, this would check if the email exists in the system
    // For this demo, we'll just check if it matches our test user
    if (email === 'oaitse.kokome@orange.com') {
      this.tempEmail = email;
      return of(true).pipe(delay(1000)); // Simulate API delay
    }
    return throwError(() => new Error('Email not found')).pipe(delay(1000));
  }

  // Step 2: Validate OTP
  validateOTP(otp: string): Observable<User> {
    // In a real app, this would validate the OTP against what was sent to the user
    // For this demo, we'll just check if it matches our test OTP
    if (!this.tempEmail) {
      return throwError(() => new Error('Email validation required first'));
    }

    if (otp === '123456') {
      return this.http.get<User[]>('/api/users').pipe(
        map(users => {
          const user = users.find(u => u.email === this.tempEmail);
          if (user) {
            return user;
          }
          throw new Error('User not found');
        }),
        tap(user => {
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Record login activity
          this.recordLoginActivity(user.id);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
    }

    return throwError(() => new Error('Invalid OTP')).pipe(delay(1000));
  }

  // Record login activity
  private recordLoginActivity(userId: number): void {
    const activity = {
      userId,
      action: 'Login',
      timestamp: new Date(),
      details: 'Successful login'
    };

    this.http.post('/api/activities', activity).subscribe();
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.tempEmail = null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Update user profile
  updateProfile(user: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('Not authenticated'));
    }

    return this.http.put<User>(`/api/users/${currentUser.id}`, {
      ...currentUser,
      ...user
    }).pipe(
      tap(updatedUser => {
        this.currentUserSubject.next(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      })
    );
  }
}
