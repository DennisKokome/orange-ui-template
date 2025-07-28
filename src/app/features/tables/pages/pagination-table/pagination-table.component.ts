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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: Date;
}

@Component({
  selector: 'app-pagination-table',
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
    MatButtonModule
  ],
  templateUrl: './pagination-table.component.html',
  styleUrl: './pagination-table.component.scss'
})
export class PaginationTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'lastLogin', 'actions'];
  dataSource: User[] = [];
  filteredData = new MatTableDataSource<User>([]);

  // Filter values
  nameFilter: string = '';
  roleFilter: string = '';
  statusFilter: string = '';

  roles: string[] = ['Admin', 'User', 'Manager', 'Editor'];
  statuses: string[] = ['Active', 'Inactive', 'Pending'];

  ngOnInit(): void {
    // Generate mock data
    this.dataSource = this.generateMockData(100);
    this.filteredData.data = this.dataSource;
  }

  ngAfterViewInit(): void {
    // Connect the data source with the paginator and sort
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;

    // Custom filter predicate for multiple filters
    this.filteredData.filterPredicate = (data: User, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const nameMatch = !searchTerms.name || data.name.toLowerCase().includes(searchTerms.name.toLowerCase());
      const roleMatch = !searchTerms.role || data.role === searchTerms.role;
      const statusMatch = !searchTerms.status || data.status === searchTerms.status;

      return nameMatch && roleMatch && statusMatch;
    };
  }

  applyFilters(): void {
    const filterValue = JSON.stringify({
      name: this.nameFilter,
      role: this.roleFilter,
      status: this.statusFilter
    });

    this.filteredData.filter = filterValue;

    if (this.filteredData.paginator) {
      this.filteredData.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.roleFilter = '';
    this.statusFilter = '';
    this.filteredData.filter = '';
  }

  private generateMockData(count: number): User[] {
    const users: User[] = [];

    for (let i = 1; i <= count; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: this.roles[Math.floor(Math.random() * this.roles.length)],
        status: this.statuses[Math.floor(Math.random() * this.statuses.length)],
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
      });
    }

    return users;
  }
}
