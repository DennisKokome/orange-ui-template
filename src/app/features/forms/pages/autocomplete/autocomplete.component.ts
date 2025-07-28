import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  // Basic autocomplete
  basicControl = new FormControl('');
  options: string[] = ['Orange', 'Apple', 'Banana', 'Pineapple', 'Mango'];
  filteredOptions: Observable<string[]> | undefined;

  // Autocomplete with custom filter
  customFilterControl = new FormControl('');
  countries: string[] = [
    'France', 'United States', 'United Kingdom', 'Germany', 'Spain',
    'Italy', 'Canada', 'Australia', 'Japan', 'China', 'Brazil', 'India'
  ];
  filteredCountries: Observable<string[]> | undefined;

  // Autocomplete with objects
  objectControl = new FormControl<string | User>('');
  users: User[] = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Bob Johnson', email: 'bob@example.com' },
    { name: 'Alice Williams', email: 'alice@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com' }
  ];
  filteredUsers: Observable<User[]> | undefined;

  ngOnInit() {
    // Initialize basic autocomplete
    this.filteredOptions = this.basicControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.options))
    );

    // Initialize custom filter autocomplete
    this.filteredCountries = this.customFilterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value || ''))
    );

    // Initialize object autocomplete
    this.filteredUsers = this.objectControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name || '';
        return name ? this._filterUsers(name) : this.users.slice();
      })
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  displayFn(user: User | string): string {
    return typeof user === 'object' && user && user.name ? user.name : '';
  }

  isUserObject(value: any): value is User {
    return value && typeof value === 'object' && 'name' in value && 'email' in value;
  }
}
