import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-form-toastr',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './form-toastr.component.html',
  styleUrls: ['./form-toastr.component.scss']
})
export class FormToastrComponent {
  // Basic form with success toast
  basicForm: FormGroup;

  // Form with different toast positions
  positionForm: FormGroup;

  // Form with different toast types
  typeForm: FormGroup;

  // Form with custom toast
  customForm: FormGroup;

  // Toast position options
  positions = [
    { value: 'top-left', viewValue: 'Top Left' },
    { value: 'top-center', viewValue: 'Top Center' },
    { value: 'top-right', viewValue: 'Top Right' },
    { value: 'bottom-left', viewValue: 'Bottom Left' },
    { value: 'bottom-center', viewValue: 'Bottom Center' },
    { value: 'bottom-right', viewValue: 'Bottom Right' }
  ];

  // Toast duration options
  durations = [
    { value: 2000, viewValue: '2 seconds' },
    { value: 5000, viewValue: '5 seconds' },
    { value: 10000, viewValue: '10 seconds' }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    // Initialize basic form
    this.basicForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Initialize position form
    this.positionForm = this.fb.group({
      message: ['', Validators.required],
      position: ['top-right', Validators.required],
      duration: [5000, Validators.required]
    });

    // Initialize type form
    this.typeForm = this.fb.group({
      message: ['', Validators.required],
      type: ['success', Validators.required]
    });

    // Initialize custom form
    this.customForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      showAction: [true]
    });
  }

  // Show basic success toast
  onBasicFormSubmit() {
    if (this.basicForm.valid) {
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      console.log('Basic form submitted:', this.basicForm.value);
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  // Show toast with different positions
  onPositionFormSubmit() {
    if (this.positionForm.valid) {
      const position = this.positionForm.get('position')?.value;
      const duration = this.positionForm.get('duration')?.value;
      const message = this.positionForm.get('message')?.value;

      let horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center';
      let verticalPosition: 'top' | 'bottom' = 'top';

      if (position.includes('left')) {
        horizontalPosition = 'start';
      } else if (position.includes('right')) {
        horizontalPosition = 'end';
      } else {
        horizontalPosition = 'center';
      }

      if (position.includes('top')) {
        verticalPosition = 'top';
      } else {
        verticalPosition = 'bottom';
      }

      this.snackBar.open(message, 'Close', {
        duration: duration,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition
      });

      console.log('Position form submitted:', this.positionForm.value);
    }
  }

  // Show toast with different types
  onTypeFormSubmit() {
    if (this.typeForm.valid) {
      const type = this.typeForm.get('type')?.value;
      const message = this.typeForm.get('message')?.value;

      this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: [`${type}-snackbar`]
      });

      console.log('Type form submitted:', this.typeForm.value);
    }
  }

  // Show custom toast
  onCustomFormSubmit() {
    if (this.customForm.valid) {
      const title = this.customForm.get('title')?.value;
      const message = this.customForm.get('message')?.value;
      const showAction = this.customForm.get('showAction')?.value;

      const snackBarRef = this.snackBar.open(
        `${title}: ${message}`,
        showAction ? 'Dismiss' : undefined,
        {
          duration: showAction ? undefined : 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        }
      );

      console.log('Custom form submitted:', this.customForm.value);
    }
  }
}
