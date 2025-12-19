import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../Models/login.model';
import { AuthResultDTO } from '../Models/auth-result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // رابط الـ .NET API
  private apiUrl = 'https://localhost:7289/api/auth'; 

  constructor(private http: HttpClient) {}

  login(dto: LoginDTO): Observable<AuthResultDTO> {
    return this.http.post<AuthResultDTO>(`${this.apiUrl}/login`, dto);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
  saveUserRole(role: string) {
  localStorage.setItem('userRole', role);
}

getUserRole(): string | null {
  return localStorage.getItem('userRole');
}
}
