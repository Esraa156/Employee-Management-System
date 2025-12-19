import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult } from 'src/app/Models/PagedResult.model';

// نموذج الموظف
export interface Employee {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  departmentId: number;
  departmentName?: string;
  jobTitleId: number;
  jobTitleName?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7289/api/employee'; 

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments`);
  }

  getJobTitles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job-titles`);
  }

 
// searchEmployees(filters: any, sortColumn: string, sortDir: string): Observable<Employee[]> {
//   // Pass the filters object directly, NOT wrapped in another 'filters' property
//   return this.http.post<Employee[]>(`${this.apiUrl}/search`, filters);
// }
 searchEmployees(filters: any): Observable<PagedResult<Employee>> {
    return this.http.post<PagedResult<Employee>>(`${this.apiUrl}/search`, filters);
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  softDelete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  exportToExcel(filters: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/export`, filters, { responseType: 'blob' });
  }
  checkEmailExists(email: string) {
  return this.http.get<boolean>(`/api/employees/check-email?email=${email}`);
}
}
