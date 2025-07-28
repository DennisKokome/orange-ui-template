import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-management-layout.component.html',
  styleUrl: './user-management-layout.component.scss'
})
export class UserManagementLayoutComponent {
  navLinks = [];
}
