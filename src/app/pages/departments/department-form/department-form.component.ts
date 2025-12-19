import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService} from '../department-service.service';
import {  Department } from '../../../Models/department.model';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;
  isEditMode = false;
  departmentId!: number;
  submissionError: string = '';

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.departmentId = +params['id'];
        this.loadDepartment(this.departmentId);
      }
    });
  }

  loadDepartment(id: number) {
    this.departmentService.getDepartmentById(id).subscribe(dept => {
      this.departmentForm.patchValue(dept);
    });
  }

  onSubmit() {
    if (this.departmentForm.invalid) return;

    const data: Department = this.departmentForm.value;

    // Only check uniqueness when submitting
    this.departmentService.checkDepartmentNameUnique(data.name).subscribe(isUnique => {
      if (!isUnique) {
        this.submissionError = 'This department name already exists';
        return;
      }

      // Clear any previous errors
      this.submissionError = '';

      if (this.isEditMode) {
        this.departmentService.updateDepartment(this.departmentId, data)
          .subscribe(() => this.router.navigate(['/departments']));
      } else {
        this.departmentService.addDepartment(data)
          .subscribe(() => this.router.navigate(['/departments']));
      }
    });
  }

}
