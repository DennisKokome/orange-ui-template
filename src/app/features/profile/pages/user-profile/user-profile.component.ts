import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule
  ]
})
export class UserProfileComponent implements OnInit {
  personalInfoForm!: FormGroup;
  addressForm!: FormGroup;
  preferencesForm!: FormGroup;
  securityForm!: FormGroup;

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'de', label: 'German' }
  ];

  themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    // Personal Information Form
    this.personalInfoForm = this.fb.group({
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['76543210', [Validators.pattern('^[0-9]{8}$')]],
      birthDate: [new Date('1990-01-01'), [Validators.required]],
      gender: ['male', [Validators.required]],
      bio: ['I am a software developer with experience in Angular and web development.']
    });

    // Address Form
    this.addressForm = this.fb.group({
      address: ['123 Main Street', [Validators.required]],
      city: ['Gaborone', [Validators.required]],
      state: ['South-East District', [Validators.required]],
      postalCode: ['00000', [Validators.required]],
      country: ['Botswana', [Validators.required]]
    });

    // Preferences Form
    this.preferencesForm = this.fb.group({
      receiveEmails: [true],
      receiveNotifications: [true],
      theme: ['light'],
      language: ['en']
    });

    // Security Form
    this.securityForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onPersonalInfoSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log('Personal Info Form Submitted', this.personalInfoForm.value);
      // Here you would typically send the data to a service
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      console.log('Address Form Submitted', this.addressForm.value);
      // Here you would typically send the data to a service
    }
  }

  onPreferencesSubmit(): void {
    if (this.preferencesForm.valid) {
      console.log('Preferences Form Submitted', this.preferencesForm.value);
      // Here you would typically send the data to a service
    }
  }

  onSecuritySubmit(): void {
    if (this.securityForm.valid) {
      console.log('Security Form Submitted', this.securityForm.value);
      // Here you would typically send the data to a service
    }
  }
}
