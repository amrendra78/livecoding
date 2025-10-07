// login/login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.isLoading = true;

    console.log('Login form submitted:', { email: this.email, password: this.password });

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        // Redirect to dashboard or home page after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {  // Explicitly type the error parameter
        console.error('Login error:', err);
        this.isLoading = false;
        
        if (err.status === 0) {
          this.error = 'Network error: Cannot connect to server';
        } else if (err.error?.message) {
          this.error = err.error.message;
        } else if (err.status === 401) {
          this.error = 'Invalid email or password';
        } else if (err.status === 404) {
          this.error = 'User not found';
        } else {
          this.error = 'Login failed. Please try again.';
        }
      }
    });
  }
}