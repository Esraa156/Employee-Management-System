import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { DepartmentService } from '../../departments/department-service.service';
import { JobsService } from '../../jobs/jobs-service.service';

import { Employee } from '../../../Models/employee.model';
import { Department } from '../../../Models/department.model';
import { Job } from '../../../Models/job.model';
import { PagedResult } from '../../../Models/PagedResult.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  departments: Department[] = [];
  jobTitles: Job[] = [];

  filters = {
    name: '',
    email: '',
    mobile: '',
    departmentId: null,
    jobTitleId: null,
    dobFrom: null,
    dobTo: null,
    sortColumn: '',
    sortDir: '',
    pageNumber: 1,
    pageSize: 5
  };

  sortColumn = '';
  sortDir: 'asc' | 'desc' = 'asc';
  totalCount = 0;
  totalPages = 0;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private jobTitleService: JobsService
  ) {}

  ngOnInit(): void {
    this.loadFiltersData();
    this.search();
  }

  loadFiltersData(): void {
    this.departmentService.getDepartments()
      .subscribe(res => this.departments = res);

    this.jobTitleService.getAllJobs()
      .subscribe(res => this.jobTitles = res);
  }

  search(): void {
    this.employeeService.searchEmployees(this.filters)
      .subscribe((res: PagedResult<Employee>) => {
        this.employees = res.items;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.filters.pageSize);
      });
  }

  // Pagination helper
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.filters.pageNumber = page;
    this.search();
  }

  // Sorting logic
  sort(col: string): void {
    if (this.sortColumn === col) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDir = 'asc';
    }

    this.filters.sortColumn = this.sortColumn;
    this.filters.sortDir = this.sortDir;
    this.filters.pageNumber = 1; 
    this.search();
  }

  softDelete(id: number): void {
    if (!confirm('Are you sure you want to deactivate this employee?')) return;

    this.employeeService.softDelete(id)
      .subscribe(() => this.search());
  }

  exportToExcel(): void {
    this.employeeService.exportToExcel(this.filters)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
