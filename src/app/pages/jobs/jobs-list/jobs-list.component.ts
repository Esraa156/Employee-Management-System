import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs-service.service';
import { Job } from '../../../Models/job.model';


import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(
    private jobService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(res => {
      this.jobs = res;
    });
  }

  editJob(id: number) {
    this.router.navigate(['/jobs/edit', id]);
  }

  deleteJob(id: number) {
    if (confirm('Are you sure to deactivate this department?')) {
 this.jobService.deleteJob(id).subscribe(() => {
      this.loadJobs();   
     })
   
    };
  }
  
}
