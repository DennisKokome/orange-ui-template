import { Component, OnInit } from '@angular/core';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-form-wizard',
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
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent implements OnInit {
  // Linear stepper form groups
  personalFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  confirmationFormGroup: FormGroup;

  // Non-linear stepper form groups
  accountFormGroup: FormGroup;
  profileFormGroup: FormGroup;
  preferencesFormGroup: FormGroup;

  // Vertical stepper form groups
  step1FormGroup: FormGroup;
  step2FormGroup: FormGroup;
  step3FormGroup: FormGroup;

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

  // Card types for select
  cardTypes = [
    { value: 'visa', viewValue: 'Visa' },
    { value: 'mastercard', viewValue: 'MasterCard' },
    { value: 'amex', viewValue: 'American Express' }
  ];

  constructor(private fb: FormBuilder) {
    // Initialize linear stepper form groups
    this.personalFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')]
    });

    this.addressFormGroup = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.paymentFormGroup = this.fb.group({
      cardType: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });

    this.confirmationFormGroup = this.fb.group({
      terms: [false, Validators.requiredTrue]
    });

    // Initialize non-linear stepper form groups
    this.accountFormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.profileFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      birthDate: [null, Validators.required],
      gender: ['', Validators.required],
      bio: ['']
    });

    this.preferencesFormGroup = this.fb.group({
      receiveEmails: [false],
      receiveNotifications: [false],
      theme: ['light'],
      language: ['en']
    });

    // Initialize vertical stepper form groups
    this.step1FormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.step2FormGroup = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.pattern('^[0-9]{10}$')]
    });

    this.step3FormGroup = this.fb.group({
      comments: [''],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
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
  onLinearFormSubmit() {
    if (this.personalFormGroup.valid && this.addressFormGroup.valid &&
        this.paymentFormGroup.valid && this.confirmationFormGroup.valid) {
      const formData = {
        personal: this.personalFormGroup.value,
        address: this.addressFormGroup.value,
        payment: this.paymentFormGroup.value,
        confirmation: this.confirmationFormGroup.value
      };
      console.log('Linear form submitted:', formData);
    }
  }

  onNonLinearFormSubmit() {
    if (this.accountFormGroup.valid && this.profileFormGroup.valid && this.preferencesFormGroup.valid) {
      const formData = {
        account: this.accountFormGroup.value,
        profile: this.profileFormGroup.value,
        preferences: this.preferencesFormGroup.value
      };
      console.log('Non-linear form submitted:', formData);
    }
  }

  onVerticalFormSubmit() {
    if (this.step1FormGroup.valid && this.step2FormGroup.valid && this.step3FormGroup.valid) {
      const formData = {
        step1: this.step1FormGroup.value,
        step2: this.step2FormGroup.value,
        step3: this.step3FormGroup.value
      };
      console.log('Vertical form submitted:', formData);
    }
  }
}
