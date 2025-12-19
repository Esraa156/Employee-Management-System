import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department-service.service';
import {  Department } from '../../../Models/department.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departments: Department[] = [];

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(d => this.departments = d);
  }

  softDelete(id: number) {
    if (confirm('Are you sure to deactivate this department?')) {
      this.departmentService.softDelete(id).subscribe(() => this.loadDepartments());
    }
  }
}
