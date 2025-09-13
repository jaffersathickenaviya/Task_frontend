import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],  // 👈 add RouterLink
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient) {}

  onSignup() {
    if (this.username && this.password) {
      this.http.post('http://localhost:3000/auth/signup', {
        username: this.username,
        password: this.password
      }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.message = 'Signup successful! You can log in now.';
          } else {
            this.message = res.message || 'Signup failed';
          }
        },
        error: (err) => {
          this.message = err.error.message || 'Error during signup';
        }
      });
    } else {
      this.message = 'Please enter username and password';
    }
  }
}
