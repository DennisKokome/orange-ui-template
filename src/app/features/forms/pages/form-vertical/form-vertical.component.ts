import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-form-vertical',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './form-vertical.component.html',
  styleUrls: ['./form-vertical.component.scss']
})
export class FormVerticalComponent {
  // Basic vertical form
  basicForm: FormGroup;

  // Contact form
  contactForm: FormGroup;

  // Registration form
  registrationForm: FormGroup;

  // Gender options for radio buttons
  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  // Country options for select
  countries = [
    { value: 'us', viewValue: 'United States' },
    { value: 'uk', viewValue: 'United Kingdom' },
    { value: 'fr', viewValue: 'France' },
    { value: 'de', viewValue: 'Germany' },
    { value: 'es', viewValue: 'Spain' },
    { value: 'it', viewValue: 'Italy' },
    { value: 'jp', viewValue: 'Japan' }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize basic form
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    // Initialize contact form
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      subscribe: [false]
    });

    // Initialize registration form
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      birthDate: [null, Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  // Form submission methods
  onBasicFormSubmit() {
    if (this.basicForm.valid) {
      console.log('Basic form submitted:', this.basicForm.value);
    }
  }

  onContactFormSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
    }
  }

  onRegistrationFormSubmit() {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
    }
  }
}
