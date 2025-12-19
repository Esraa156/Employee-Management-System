import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../jobs-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css']
})
export class JobFormComponent implements OnInit {

  jobForm!: FormGroup;
  isEditMode = false;
  jobId!: number;
  submissionError: string = '';

  constructor(
    private fb: FormBuilder,
    private jobService: JobsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      name: ['', Validators.required]
    });

    // Check if edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.jobId = +params['id'];
        this.loadJob(this.jobId);
      }
    });
  }

  loadJob(id: number) {
    this.jobService.getJobById(id).subscribe(job => {
      this.jobForm.patchValue(job);
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;

    const jobData = this.jobForm.value;

    this.jobService.checkJobNameUnique(jobData.name, this.jobId).subscribe(isUnique => {
      if (!isUnique) {
        this.submissionError = 'This job name already exists';
        return;
      }

      if (this.isEditMode) {
        this.jobService.updateJob(this.jobId, jobData)
          .subscribe(() => this.router.navigate(['/jobs']));
      } else {
        this.jobService.addJob(jobData)
          .subscribe(() => this.router.navigate(['/jobs']));
      }
    });
  }
}
