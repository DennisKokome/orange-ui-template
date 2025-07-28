import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tables-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule
  ],
  templateUrl: './tables-layout.component.html',
  styleUrl: './tables-layout.component.scss'
})
export class TablesLayoutComponent {
  navLinks = [
    { path: 'pagination-table', label: 'Pagination Table' },
    { path: 'infinite-scroll-table', label: 'Infinite Scroll Table' }
  ];
}
