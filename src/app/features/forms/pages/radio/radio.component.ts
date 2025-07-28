import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  // Basic radio buttons
  basicFavorite = new FormControl('');
  basicOptions: string[] = ['Orange', 'Apple', 'Banana', 'Pineapple'];

  // Radio button group with form
  seasonForm = new FormGroup({
    season: new FormControl('winter')
  });
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  // Radio buttons with labels and descriptions
  technologyForm = new FormGroup({
    technology: new FormControl('angular')
  });
  technologies = [
    { value: 'angular', viewValue: 'Angular', description: 'A platform for building mobile and desktop web applications' },
    { value: 'react', viewValue: 'React', description: 'A JavaScript library for building user interfaces' },
    { value: 'vue', viewValue: 'Vue', description: 'A progressive framework for building user interfaces' }
  ];

  // Disabled radio buttons
  disabledOptions = new FormGroup({
    option: new FormControl({value: 'option2', disabled: true})
  });
}
