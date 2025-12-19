import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../Models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private apiUrl = "https://localhost:7289/api/job";

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }
checkJobNameUnique(name: string, id?: number) {
  // id optional → في حالة التعديل لتجاهل الاسم الحالي
  return this.http.get<boolean>(`https://localhost:7289/api/job/is-unique?name=${name}&id=${id || 0}`);
}
  addJob(job: Job): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
