import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
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
    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Signup failed';
      }
    });
  }
}
