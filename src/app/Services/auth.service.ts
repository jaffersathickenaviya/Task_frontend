import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // Here you would call your backend API to validate
    if (username === 'admin' && password === 'admin') { // example
      this.loggedIn = true;
      localStorage.setItem('token', 'dummy-token'); // store token
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}
