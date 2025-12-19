import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../Models/login.model';
import { AuthResultDTO } from 'src/app/Models/auth-result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  email: string = '';          
  password: string = '';      
  errorMessage: string = '';  

constructor(private authService: AuthService, private router: Router) {}

 login() {
    const dto: LoginDTO = { email: this.email, password: this.password };
    this.authService.login(dto).subscribe({
      next: (res: AuthResultDTO) => {
        console.log('Login response:', res); 
        if (res.success && res.token) {
   this.authService.saveToken(res.token);
const role = res.role!; 
this.authService.saveUserRole(role)    
    console.log('Redirecting as role:', res.role);

    if (res.role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/employees']);
    }
        } else {
          this.errorMessage = 'Email or password is incorrect';
        }
      },
      error: err => {
        console.log('Login error:', err); 
        this.errorMessage = err.error?.message || 'Email or password is incorrect';
      }
    });
  }
}