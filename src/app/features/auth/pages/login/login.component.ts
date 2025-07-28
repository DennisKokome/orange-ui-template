import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  isEmailSubmitted = false;
  isLoading = false;
  returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Initialize forms
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  // Step 1: Submit email
  onEmailSubmit(): void {
    if (this.emailForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.emailForm.get('email')?.value;

    this.authService.validateEmail(email)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.isEmailSubmitted = true;
          this.notificationService.success('OTP sent to your email');
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Email validation failed');
        }
      });
  }

  // Step 2: Submit OTP
  onOtpSubmit(): void {
    if (this.otpForm.invalid) {
      return;
    }

    this.isLoading = true;
    const otp = this.otpForm.get('otp')?.value;

    this.authService.validateOTP(otp)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.notificationService.success('Login successful');
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Invalid OTP');
        }
      });
  }

  // Go back to email step
  goBackToEmail(): void {
    this.isEmailSubmitted = false;
    this.otpForm.reset();
  }
}
