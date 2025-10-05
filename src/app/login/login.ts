import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // fixed styleUrl -> styleUrls
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    
    // Pass a single object instead of two separate arguments
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => this.error = err.error?.message || 'Login failed'
    });
  }
}
