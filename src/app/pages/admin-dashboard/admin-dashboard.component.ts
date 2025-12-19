import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  dashboardCards = [
    {
      title: 'Employee Management',
      description: 'View, add, edit, and export employee data.',
      icon: 'people',
      route: 'employees'
    },
    {
      title: 'Department Management',
      description: 'Manage the company’s reference departments list.',
      icon: 'business',
      route: 'departments'
    },
    {
      title: 'Job Titles Management',
      description: 'Manage the list of reference job titles.',
      icon: 'work',
      route: 'jobs'
    }
  ];

  constructor() { }
}
