import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  };

  success(message: string, action: string = 'Close', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config,
      panelClass: ['success-snackbar']
    });
  }

  error(message: string, action: string = 'Close', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config,
      panelClass: ['error-snackbar']
    });
  }

  info(message: string, action: string = 'Close', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config,
      panelClass: ['info-snackbar']
    });
  }

  warn(message: string, action: string = 'Close', config?: MatSnackBarConfig): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      ...config,
      panelClass: ['warning-snackbar']
    });
  }
}
