import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentFormComponent } from '../departments/department-form/department-form.component';
import { DepartmentListComponent } from '../departments/department-list/department-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DepartmentListComponent },
      { path: 'add', component: DepartmentFormComponent },
      { path: 'edit/:id', component: DepartmentFormComponent }
    ])
  ]
})
export class DepartmentsModule { }

