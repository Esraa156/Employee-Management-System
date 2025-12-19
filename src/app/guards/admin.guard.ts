import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.checkAdmin();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkAdmin();
  }

  private checkAdmin(): boolean {
    const role = localStorage.getItem('userRole');

    if (role === 'Admin') {
      return true;
    }

    this.router.navigate(['/login']); 
    return false;
  }
}
