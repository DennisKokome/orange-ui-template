import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-forms-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './forms-layout.component.html',
  styleUrls: ['./forms-layout.component.scss']
})
export class FormsLayoutComponent {
  formPages = [
    { name: 'Autocomplete', route: '/forms/autocomplete', icon: 'search', disabled: false },
    { name: 'Button', route: '/forms/button', icon: 'smart_button', disabled: false },
    { name: 'Checkbox', route: '/forms/checkbox', icon: 'check_box', disabled: false },
    { name: 'Radio', route: '/forms/radio', icon: 'radio_button_checked', disabled: false },
    { name: 'Datepicker', route: '/forms/datepicker', icon: 'calendar_today', disabled: false },
    { name: 'Form Layouts', route: '/forms/form-layouts', icon: 'view_quilt', disabled: false },
    { name: 'Form Horizontal', route: '/forms/form-horizontal', icon: 'view_stream', disabled: false },
    { name: 'Form Vertical', route: '/forms/form-vertical', icon: 'view_agenda', disabled: false },
    { name: 'Form Wizard', route: '/forms/form-wizard', icon: 'linear_scale', disabled: false },
    { name: 'Form Toastr', route: '/forms/form-toastr', icon: 'notifications', disabled: false },
    { name: 'Form Editor', route: '/forms/form-editor', icon: 'edit_note', disabled: false }
  ];
}
