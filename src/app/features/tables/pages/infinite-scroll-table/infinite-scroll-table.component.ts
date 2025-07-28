import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: string;
}

@Component({
  selector: 'app-infinite-scroll-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './infinite-scroll-table.component.html',
  styleUrl: './infinite-scroll-table.component.scss'
})
export class InfiniteScrollTableComponent implements OnInit {
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'stock', 'rating', 'status'];
  allData: Product[] = [];
  displayData: Product[] = [];
  filteredData: Product[] = [];

  // Filter values
  nameFilter: string = '';
  categoryFilter: string = '';
  statusFilter: string = '';
  minPriceFilter: number | null = null;
  maxPriceFilter: number | null = null;

  categories: string[] = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports', 'Toys'];
  statuses: string[] = ['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued'];

  // Infinite scroll properties
  pageSize: number = 20;
  currentPage: number = 0;
  isLoading: boolean = false;
  allDataLoaded: boolean = false;

  ngOnInit(): void {
    // Generate mock data
    this.allData = this.generateMockData(500);
    this.filteredData = [...this.allData];
    this.loadMoreData();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 200) {
      this.loadMoreData();
    }
  }

  loadMoreData(): void {
    if (this.isLoading || this.allDataLoaded) {
      return;
    }

    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      if (startIndex >= this.filteredData.length) {
        this.allDataLoaded = true;
        this.isLoading = false;
        return;
      }

      const newData = this.filteredData.slice(startIndex, endIndex);
      this.displayData = [...this.displayData, ...newData];
      this.currentPage++;
      this.isLoading = false;
    }, 800);
  }

  applyFilters(): void {
    this.filteredData = this.allData.filter(product => {
      const nameMatch = this.nameFilter ? product.name.toLowerCase().includes(this.nameFilter.toLowerCase()) : true;
      const categoryMatch = this.categoryFilter ? product.category === this.categoryFilter : true;
      const statusMatch = this.statusFilter ? product.status === this.statusFilter : true;
      const minPriceMatch = this.minPriceFilter !== null ? product.price >= this.minPriceFilter : true;
      const maxPriceMatch = this.maxPriceFilter !== null ? product.price <= this.maxPriceFilter : true;

      return nameMatch && categoryMatch && statusMatch && minPriceMatch && maxPriceMatch;
    });

    // Reset display data and pagination
    this.displayData = [];
    this.currentPage = 0;
    this.allDataLoaded = false;
    this.loadMoreData();
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.categoryFilter = '';
    this.statusFilter = '';
    this.minPriceFilter = null;
    this.maxPriceFilter = null;

    this.filteredData = [...this.allData];
    this.displayData = [];
    this.currentPage = 0;
    this.allDataLoaded = false;
    this.loadMoreData();
  }

  private generateMockData(count: number): Product[] {
    const products: Product[] = [];

    for (let i = 1; i <= count; i++) {
      const category = this.categories[Math.floor(Math.random() * this.categories.length)];
      const price = Math.floor(Math.random() * 1000) + 10;
      const stock = Math.floor(Math.random() * 100);
      let status: string;

      if (stock === 0) {
        status = 'Out of Stock';
      } else if (stock < 10) {
        status = 'Low Stock';
      } else if (Math.random() < 0.1) {
        status = 'Discontinued';
      } else {
        status = 'In Stock';
      }

      products.push({
        id: i,
        name: `Product ${i}`,
        category,
        price,
        stock,
        rating: Math.floor(Math.random() * 5) + 1,
        status
      });
    }

    return products;
  }
}
