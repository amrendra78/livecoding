// signup.component.ts - UPDATED
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
  isLoading = false;
  successMessage = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.error = '';
    this.successMessage = '';
    this.isLoading = true;

    console.log('🔄 Starting signup process...');

    this.auth.signup({ 
      name: this.name, 
      email: this.email, 
      password: this.password 
    }).subscribe({
      next: (response: any) => {
        console.log('✅ Signup successful - Full response:', response);
        this.isLoading = false;
        
        if (response && response.success) {
          this.successMessage = response.message || 'Signup successful!';
          
          // Clear form
          this.name = '';
          this.email = '';
          this.password = '';
          
          // Redirect after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.error = response.message || 'Signup completed but no success status received';
        }
      },
      error: (err: Error) => {
        console.error('❌ Signup error in component:', err);
        this.isLoading = false;
        this.error = err.message || 'Signup failed due to unknown error';
      },
      complete: () => {
        console.log('✅ Signup observable completed');
        this.isLoading = false;
      }
    });
  }
}