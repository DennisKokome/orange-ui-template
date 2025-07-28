import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

import { User, UserRole, UserStatus } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('activeTable') activeTable!: MatTable<User>;
  @ViewChild('inactiveTable') inactiveTable!: MatTable<User>;

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'role', 'status', 'createdAt', 'lastLogin', 'actions'];
  activeDataSource = new MatTableDataSource<User>([]);
  inactiveDataSource = new MatTableDataSource<User>([]);

  // Filter values
  searchQuery: string = '';
  roleFilter: string = '';
  statusFilter: string = '';

  roles: UserRole[] = ['Admin', 'User', 'Manager', 'Editor'];
  statuses: UserStatus[] = ['active', 'inactive'];

  selectedTabIndex = 0;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.activeDataSource.paginator = this.paginator;
    this.activeDataSource.sort = this.sort;
    this.inactiveDataSource.sort = this.sort;

    // Custom filter predicate
    this.activeDataSource.filterPredicate = this.createFilterPredicate();
    this.inactiveDataSource.filterPredicate = this.createFilterPredicate();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      const activeUsers = users.filter(user => user.status === 'active');
      const inactiveUsers = users.filter(user => user.status === 'inactive');

      this.activeDataSource.data = activeUsers;
      this.inactiveDataSource.data = inactiveUsers;
    });
  }

  applyFilter(): void {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.activeDataSource.filter = filterValue;
    this.inactiveDataSource.filter = filterValue;

    if (this.activeDataSource.paginator) {
      this.activeDataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.roleFilter = '';
    this.statusFilter = '';
    this.applyFilter();
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  confirmDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete user ${user.name}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  toggleUserStatus(user: User): void {
    const newStatus: UserStatus = user.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        message: `Are you sure you want to ${action} user ${user.name}?`,
        confirmText: 'Yes',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.changeUserStatus(user.id, newStatus).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  onTabChange(event: any): void {
    this.selectedTabIndex = event.index;
  }

  private createFilterPredicate(): (data: User, filter: string) => boolean {
    return (data: User, filter: string): boolean => {
      const searchStr = filter.toLowerCase();

      return data.name.toLowerCase().includes(searchStr) ||
             data.email.toLowerCase().includes(searchStr) ||
             data.phone.toLowerCase().includes(searchStr);
    };
  }
}
