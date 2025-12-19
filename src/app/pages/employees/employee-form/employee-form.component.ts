import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn
} from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../employees/employee-service.service';
import { DepartmentService } from '../../departments/department-service.service';
import { JobsService } from '../../jobs/jobs-service.service';
import { Employee } from '../../../Models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  departments: any[] = [];
  jobTitles: any[] = [];

  isEditMode = false;
  employeeId!: number;
  submissionError: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private jobTitleService: JobsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFiltersData();
    this.trimMobile();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  // Async Validator for unique email (create mode)
  emailUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return this.employeeService.checkEmailExists(control.value).pipe(
        map(isExists => (isExists ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  // Async Validator for editing (ignore current email)
  emailUniqueValidatorForEdit(currentEmail: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value || control.value === currentEmail) return of(null);
      return this.employeeService.checkEmailExists(control.value).pipe(
        map(isExists => (isExists ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], [this.emailUniqueValidator()]],
      mobile: ['', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
      dateOfBirth: ['', Validators.required],
      departmentId: ['', Validators.required],
      jobTitleId: ['', Validators.required],
      isActive: [true]
    });
  }

  loadFiltersData(): void {
    this.departmentService.getDepartments().subscribe(res => (this.departments = res));
    this.jobTitleService.getAllJobs().subscribe(res => (this.jobTitles = res));
  }

  trimMobile(): void {
    this.employeeForm.get('mobile')?.valueChanges.subscribe(value => {
      if (value) {
        this.employeeForm.get('mobile')?.setValue(value.trim(), { emitEvent: false });
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res: Employee) => {
        this.employeeForm.patchValue({
          fullName: res.fullName,
          email: res.email,
          mobile: res.mobile,
          dateOfBirth: res.dateOfBirth ? new Date(res.dateOfBirth).toISOString().substring(0, 10) : '',
          departmentId: res.departmentId,
          jobTitleId: res.jobTitleId,
          isActive: res.isActive
        });

        // Update email validator to ignore current email
        this.employeeForm.get('email')?.setAsyncValidators(
          this.emailUniqueValidatorForEdit(res.email)
        );
      },
      error: (err) => {
        console.error('Failed to load employee', err);
        this.submissionError = 'Failed to load employee data.';
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;

    const employee: Employee = this.employeeForm.value;

    if (this.isEditMode) {
      // Update existing employee
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
        next: res => {
          console.log('Employee updated successfully', res);
          this.isSubmitting = false;
          this.router.navigate(['/employees']); 
        },
        error: err => this.handleError(err)
      });
    } else {
      // Add new employee
      this.employeeService.addEmployee(employee).subscribe({
        next: res => {
          console.log('Employee added successfully', res);
          this.employeeForm.reset({ isActive: true });
          this.isSubmitting = false;
           this.router.navigate(['/employees']); 

        },
        error: err => this.handleError(err)
      });
    }
  }

  handleError(err: any) {
    this.isSubmitting = false;
    if (err.status === 400 && err.error?.errors?.Email?.length > 0) {
      this.employeeForm.controls['email'].setErrors({ serverError: err.error.errors.Email[0] });
      this.submissionError = err.error.errors.Email[0];
    } else {
      this.submissionError = 'Email Already Exist.';
    }
  }
}
