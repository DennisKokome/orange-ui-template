import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { UserProfileComponent } from './features/profile/pages/user-profile/user-profile.component';
import { UserManagementLayoutComponent } from './features/user-management/components/user-management-layout/user-management-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
        path: 'forms',
        loadComponent: () => import('./features/forms/components/forms-layout/forms-layout.component').then(m => m.FormsLayoutComponent),
        children: [
          { path: 'autocomplete', loadComponent: () => import('./features/forms/pages/autocomplete/autocomplete.component').then(m => m.AutocompleteComponent) },
          { path: 'button', loadComponent: () => import('./features/forms/pages/button/button.component').then(m => m.ButtonComponent) },
          { path: 'checkbox', loadComponent: () => import('./features/forms/pages/checkbox/checkbox.component').then(m => m.CheckboxComponent) },
          { path: 'radio', loadComponent: () => import('./features/forms/pages/radio/radio.component').then(m => m.RadioComponent) },
          { path: 'datepicker', loadComponent: () => import('./features/forms/pages/datepicker/datepicker.component').then(m => m.DatepickerComponent) },
          { path: 'form-layouts', loadComponent: () => import('./features/forms/pages/form-layouts/form-layouts.component').then(m => m.FormLayoutsComponent) },
          { path: 'form-horizontal', loadComponent: () => import('./features/forms/pages/form-horizontal/form-horizontal.component').then(m => m.FormHorizontalComponent) },
          { path: 'form-vertical', loadComponent: () => import('./features/forms/pages/form-vertical/form-vertical.component').then(m => m.FormVerticalComponent) },
          { path: 'form-wizard', loadComponent: () => import('./features/forms/pages/form-wizard/form-wizard.component').then(m => m.FormWizardComponent) },
          { path: 'form-toastr', loadComponent: () => import('./features/forms/pages/form-toastr/form-toastr.component').then(m => m.FormToastrComponent) },
          { path: 'form-editor', loadComponent: () => import('./features/forms/pages/form-editor/form-editor.component').then(m => m.FormEditorComponent) },
          { path: '', redirectTo: 'autocomplete', pathMatch: 'full' }
        ]
      },
      {
        path: 'tables',
        loadComponent: () => import('./features/tables/components/tables-layout/tables-layout.component').then(m => m.TablesLayoutComponent),
        children: [
          { path: 'pagination-table', loadComponent: () => import('./features/tables/pages/pagination-table/pagination-table.component').then(m => m.PaginationTableComponent) },
          { path: 'infinite-scroll-table', loadComponent: () => import('./features/tables/pages/infinite-scroll-table/infinite-scroll-table.component').then(m => m.InfiniteScrollTableComponent) },
          { path: '', redirectTo: 'pagination-table', pathMatch: 'full' }
        ]
      },
      {
        path: 'user-management',
        component: UserManagementLayoutComponent,
        children: [
          { path: 'list', loadComponent: () => import('./features/user-management/pages/user-list/user-list.component').then(m => m.UserListComponent) },
          { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./features/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
