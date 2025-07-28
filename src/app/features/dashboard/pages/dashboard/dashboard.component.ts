import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  averageSessionDuration: number;
}

interface Activity {
  id: number;
  userId: number;
  action: string;
  timestamp: Date;
  details: string;
}

interface ChartData {
  userActivity: {
    labels: string[];
    datasets: any[];
  };
  sessionsByDevice: {
    labels: string[];
    datasets: any[];
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseChartDirective,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: Stats | null = null;
  activities: Activity[] = [];
  chartData: ChartData | null = null;
  isLoading = true;
  dateRangeForm: FormGroup;

  // Chart configurations
  userActivityChartData: ChartConfiguration<'line'>['data'] | null = null;
  userActivityChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  sessionsByDeviceChartData: ChartConfiguration<'pie'>['data'] | null = null;
  sessionsByDeviceChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.dateRangeForm = this.fb.group({
      startDate: [new Date(new Date().setDate(new Date().getDate() - 7))],
      endDate: [new Date()]
    });
  }

  ngOnInit(): void {
    console.log('Dashboard component initialized');
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    console.log('Loading dashboard data...');
    this.isLoading = true;
    let completedRequests = 0;
    const totalRequests = 3;

    const checkAllRequestsCompleted = () => {
      completedRequests++;
      console.log(`Completed ${completedRequests}/${totalRequests} requests`);
      if (completedRequests === totalRequests) {
        console.log('All requests completed, setting isLoading to false');
        this.isLoading = false;
      }
    };

    // Load stats
    console.log('Fetching stats data...');
    this.http.get<Stats>('/api/stats').subscribe({
      next: (data) => {
        console.log('Stats data received:', data);
        this.stats = data;
        checkAllRequestsCompleted();
      },
      error: (error) => {
        console.error('Error loading stats:', error);
        // Create mock stats data as fallback
        console.log('Creating mock stats data as fallback');
        this.stats = {
          totalUsers: 100,
          activeUsers: 75,
          totalSessions: 500,
          averageSessionDuration: 30
        };
        checkAllRequestsCompleted();
      }
    });

    // Load activities
    console.log('Fetching activities data...');
    this.http.get<Activity[]>('/api/activities').subscribe({
      next: (data) => {
        console.log('Activities data received:', data);
        this.activities = data.sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        checkAllRequestsCompleted();
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        // Create mock activities data as fallback
        console.log('Creating mock activities data as fallback');
        this.activities = [
          {
            id: 1,
            userId: 1,
            action: 'Login',
            timestamp: new Date(),
            details: 'User logged in'
          },
          {
            id: 2,
            userId: 2,
            action: 'Profile Update',
            timestamp: new Date(Date.now() - 3600000),
            details: 'User updated profile'
          },
          {
            id: 3,
            userId: 3,
            action: 'Logout',
            timestamp: new Date(Date.now() - 7200000),
            details: 'User logged out'
          }
        ];
        checkAllRequestsCompleted();
      }
    });

    // Load chart data
    console.log('Fetching chart data...');
    this.http.get<ChartData>('/api/chartData').subscribe({
      next: (data) => {
        console.log('Chart data received:', data);
        this.chartData = data;
        this.setupCharts();
        checkAllRequestsCompleted();
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
        // Create mock chart data as fallback
        console.log('Creating mock chart data as fallback');
        this.chartData = {
          userActivity: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Active Users',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: 'rgba(255, 107, 53, 0.2)',
              borderColor: 'rgb(255, 107, 53)',
              borderWidth: 1
            }]
          },
          sessionsByDevice: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
              data: [300, 150, 100],
              backgroundColor: ['#FF6F61', '#00A8E8', '#4CAF50'],
              hoverOffset: 4
            }]
          }
        };
        this.setupCharts();
        checkAllRequestsCompleted();
      }
    });
  }

  setupCharts(): void {
    console.log('Setting up charts with data:', this.chartData);
    if (this.chartData) {
      try {
        // User activity chart
        this.userActivityChartData = {
          labels: this.chartData.userActivity.labels,
          datasets: this.chartData.userActivity.datasets
        };
        console.log('User activity chart data set up:', this.userActivityChartData);

        // Sessions by device chart
        this.sessionsByDeviceChartData = {
          labels: this.chartData.sessionsByDevice.labels,
          datasets: this.chartData.sessionsByDevice.datasets
        };
        console.log('Sessions by device chart data set up:', this.sessionsByDeviceChartData);
      } catch (error) {
        console.error('Error setting up charts:', error);
        // Create fallback chart data if there's an error
        this.createFallbackChartData();
      }
    } else {
      console.warn('No chart data available, creating fallback data');
      this.createFallbackChartData();
    }
  }

  createFallbackChartData(): void {
    console.log('Creating fallback chart data');
    // User activity chart fallback
    this.userActivityChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Active Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 107, 53, 0.2)',
        borderColor: 'rgb(255, 107, 53)',
        borderWidth: 1
      }]
    };

    // Sessions by device chart fallback
    this.sessionsByDeviceChartData = {
      labels: ['Desktop', 'Mobile', 'Tablet'],
      datasets: [{
        data: [300, 150, 100],
        backgroundColor: ['#FF6F61', '#00A8E8', '#4CAF50'],
        hoverOffset: 4
      }]
    };
  }

  onDateRangeChange(): void {
    // In a real app, this would filter data based on the selected date range
    // For this demo, we'll just reload the data
    this.loadDashboardData();
  }
}
