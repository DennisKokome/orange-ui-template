import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    const users = [
      {
        id: 1,
        email: 'oaitse.kokome@orange.com',
        name: 'Oaitse Kokome',
        avatar: 'assets/images/avatars/avatar-1.png',
        phone: '+1 234 567 890',
        role: 'Administrator'
      },
      {
        id: 2,
        email: 'john.doe@orange.com',
        name: 'John Doe',
        avatar: 'assets/images/avatars/avatar-2.png',
        phone: '+1 987 654 321',
        role: 'User'
      },
      {
        id: 3,
        email: 'jane.smith@orange.com',
        name: 'Jane Smith',
        avatar: 'assets/images/avatars/avatar-3.png',
        phone: '+1 555 123 456',
        role: 'Manager'
      }
    ];

    const activities = [
      {
        id: 1,
        userId: 1,
        action: 'Login',
        timestamp: new Date(2025, 6, 27, 9, 30, 0),
        details: 'Successful login from 192.168.1.1'
      },
      {
        id: 2,
        userId: 1,
        action: 'Profile Update',
        timestamp: new Date(2025, 6, 27, 10, 15, 0),
        details: 'Updated profile information'
      },
      {
        id: 3,
        userId: 2,
        action: 'Login',
        timestamp: new Date(2025, 6, 27, 11, 0, 0),
        details: 'Successful login from 192.168.1.2'
      },
      {
        id: 4,
        userId: 3,
        action: 'Login',
        timestamp: new Date(2025, 6, 26, 14, 30, 0),
        details: 'Successful login from 192.168.1.3'
      },
      {
        id: 5,
        userId: 2,
        action: 'Logout',
        timestamp: new Date(2025, 6, 26, 16, 45, 0),
        details: 'User logged out'
      }
    ];

    const stats = {
      totalUsers: 3,
      activeUsers: 2,
      totalSessions: 10,
      averageSessionDuration: 45
    };

    const chartData = {
      userActivity: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Active Users',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(255, 111, 97, 0.2)',
            borderColor: 'rgb(255, 111, 97)',
            borderWidth: 1
          }
        ]
      },
      sessionsByDevice: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            data: [300, 150, 100],
            backgroundColor: ['#FF6F61', '#00A8E8', '#4CAF50'],
            hoverOffset: 4
          }
        ]
      }
    };

    return { users, activities, stats, chartData };
  }
}
