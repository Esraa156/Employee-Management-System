import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobFormComponent } from './jobs-form/jobs-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    JobsListComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     RouterModule.forChild([
          { path: '', component: JobsListComponent },
          { path: 'add', component: JobFormComponent },
          { path: 'edit/:id', component: JobFormComponent },
        ])
  ]
  
})
export class JobsModule { }
