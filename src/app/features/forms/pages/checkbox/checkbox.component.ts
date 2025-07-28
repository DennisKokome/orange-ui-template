import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  // Basic checkbox
  checked = false;
  indeterminate = false;

  // Checkbox with ngModel
  isChecked = true;

  // Checkbox form
  checkboxForm: FormGroup;

  // Checkbox list
  tasks = [
    { name: 'Complete project documentation', completed: false, color: 'primary' },
    { name: 'Prepare presentation slides', completed: false, color: 'accent' },
    { name: 'Review code changes', completed: true, color: 'warn' },
    { name: 'Update dependencies', completed: false, color: 'primary' }
  ];

  // Checkbox with indeterminate state
  allComplete = false;
  someComplete = false;

  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      acceptTerms: [false, Validators.requiredTrue],
      receiveEmails: [true],
      receiveNotifications: [false]
    });
    this.updateAllComplete();
  }

  // Method to update all tasks
  updateAllComplete() {
    this.allComplete = this.tasks.every(t => t.completed);
    this.someComplete = this.tasks.some(t => t.completed) && !this.allComplete;
  }

  // Method to set all tasks to the same completed state
  setAll(completed: boolean) {
    this.allComplete = completed;
    this.tasks.forEach(t => t.completed = completed);
  }

  // Method to handle checkbox change event
  onAllTasksChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.setAll(target.checked);
  }

  // Method to handle form submission
  onSubmit() {
    if (this.checkboxForm.valid) {
      console.log('Form submitted:', this.checkboxForm.value);
      // In a real app, you would send this data to a server
    }
  }

  // Method to get completed tasks count
  getCompletedTasksCount(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  // Method to get total tasks count
  getTotalTasksCount(): number {
    return this.tasks.length;
  }
}
