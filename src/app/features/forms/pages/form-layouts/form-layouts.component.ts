import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-form-layouts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule
  ],
  templateUrl: './form-layouts.component.html',
  styleUrls: ['./form-layouts.component.scss']
})
export class FormLayoutsComponent {
  // Basic form
  basicForm: FormGroup;

  // Grid form
  gridForm: FormGroup;

  // Inline form
  inlineForm: FormGroup;

  // Card form
  cardForm: FormGroup;

  // Form with tabs
  tabsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize basic form
    this.basicForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });

    // Initialize grid form
    this.gridForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      city: [''],
      state: [''],
      zip: ['']
    });

    // Initialize inline form
    this.inlineForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Initialize card form
    this.cardForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    // Initialize tabs form
    this.tabsForm = this.fb.group({
      // Personal Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],

      // Address
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],

      // Payment
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  // Form submission methods
  onBasicFormSubmit() {
    if (this.basicForm.valid) {
      console.log('Basic form submitted:', this.basicForm.value);
    }
  }

  onGridFormSubmit() {
    if (this.gridForm.valid) {
      console.log('Grid form submitted:', this.gridForm.value);
    }
  }

  onInlineFormSubmit() {
    if (this.inlineForm.valid) {
      console.log('Inline form submitted:', this.inlineForm.value);
    }
  }

  onCardFormSubmit() {
    if (this.cardForm.valid) {
      console.log('Card form submitted:', this.cardForm.value);
    }
  }

  onTabsFormSubmit() {
    if (this.tabsForm.valid) {
      console.log('Tabs form submitted:', this.tabsForm.value);
    }
  }
}
