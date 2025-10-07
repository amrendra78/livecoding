// auth.service.ts - COMPLETE VERSION
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('🔗 API URL:', this.apiUrl);
  }

  // Signup Method
  signup(userData: any): Observable<any> {
    const url = `${this.apiUrl}/api/signup`;
    console.log('📤 Signup request to:', url);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, userData, { 
      headers: headers,
      withCredentials: true 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Login Method - ADD THIS
  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/api/login`;
    console.log('📤 Login request to:', url);
    console.log('🔑 Login credentials:', credentials);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, credentials, { 
      headers: headers,
      withCredentials: true 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Test backend connection
  testBackend(): Observable<any> {
    const url = `${this.apiUrl}/api/test`;
    console.log('🧪 Testing backend:', url);
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Get all users (for debugging)
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/users`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('❌ API Error:', error);
    
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}