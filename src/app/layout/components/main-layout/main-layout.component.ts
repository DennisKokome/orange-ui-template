import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { User } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer: any;

  isHandset$!: Observable<boolean>;
  isNavbarCollapsed = true;
  isSidenavOpen = false;

  currentUser: User | null = null;

  // Navigation items
  navItems = [
    { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { name: 'Tables', route: '/tables', icon: 'table' },
    { name: 'Forms', route: '/forms', icon: 'edit' },
    { name: 'User Management', route: '/user-management', icon: 'group' },
    { name: 'Profile', route: '/profile', icon: 'person' },
    { name: 'UI Components', route: '/ui-components', icon: 'widgets' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    // Set initial sidenav state based on screen size
    this.isHandset$.subscribe(isHandset => {
      this.isSidenavOpen = !isHandset;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.success('You have been logged out');
    this.router.navigate(['/login']);
  }

  // Side menu methods
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  closeSidenavOnMobile(): void {
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        this.isSidenavOpen = false;
        if (this.drawer) {
          this.drawer.close();
        }
      }
    });
  }

  // Map Material icons to Bootstrap icons
  getBootstrapIcon(materialIcon: string): string {
    const iconMap: { [key: string]: string } = {
      'dashboard': 'speedometer2',
      'table': 'table',
      'person': 'person-fill',
      'widgets': 'grid-3x3-gap-fill',
      'home': 'house-fill',
      'settings': 'gear-fill',
      'favorite': 'heart-fill',
      'star': 'star-fill',
      'delete': 'trash-fill',
      'edit': 'pencil-fill',
      'add': 'plus-lg',
      'remove': 'dash-lg',
      'search': 'search',
      'menu': 'list',
      'close': 'x-lg',
      'check': 'check-lg',
      'warning': 'exclamation-triangle-fill',
      'error': 'exclamation-circle-fill',
      'info': 'info-circle-fill',
      'help': 'question-circle-fill',
      'mail': 'envelope-fill',
      'phone': 'telephone-fill',
      'location': 'geo-alt-fill',
      'calendar': 'calendar-fill',
      'time': 'clock-fill',
      'file': 'file-earmark-fill',
      'folder': 'folder-fill',
      'image': 'image-fill',
      'video': 'film',
      'audio': 'music-note-beamed',
      'link': 'link-45deg',
      'lock': 'lock-fill',
      'unlock': 'unlock-fill',
      'send': 'send-fill',
      'download': 'download',
      'upload': 'upload',
      'refresh': 'arrow-clockwise',
      'sync': 'arrow-repeat',
      'more_vert': 'three-dots-vertical',
      'more_horiz': 'three-dots',
      'expand_more': 'chevron-down',
      'expand_less': 'chevron-up',
      'arrow_back': 'arrow-left',
      'arrow_forward': 'arrow-right',
      'arrow_upward': 'arrow-up',
      'arrow_downward': 'arrow-down',
      'notifications': 'bell-fill',
      'visibility': 'eye-fill',
      'visibility_off': 'eye-slash-fill',
      'account_circle': 'person-circle',
      'group': 'people-fill',
      'shopping_cart': 'cart-fill',
      'payment': 'credit-card-fill',
      'attach_file': 'paperclip',
      'format_align_left': 'text-left',
      'format_align_center': 'text-center',
      'format_align_right': 'text-right',
      'format_align_justify': 'justify',
      'sentiment_very_satisfied': 'emoji-smile-fill',
      'box-arrow-right': 'box-arrow-right'
    };

    return iconMap[materialIcon] || materialIcon;
  }

  // Toggle user menu
  userMenuOpen = false;

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  // Toggle navbar collapse for mobile
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
