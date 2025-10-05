import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.auth.signup({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = err.error?.message || 'Signup failed'
    });
  }
}
