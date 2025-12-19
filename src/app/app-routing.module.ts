import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-dashboard.module').then(m => m.AdminDashboardModule)
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'departments',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AdminGuard],
    loadChildren: () =>
      import('./pages/departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'jobs',
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AdminGuard],
    loadChildren: () =>
      import('./pages/jobs/jobs.module').then(m => m.JobsModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
