import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
<<<<<<< HEAD
  private baseUrl = environment.apiUrl; // https://my-backend-app-seven.vercel.app

  constructor(private http: HttpClient) {}

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/signup`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, data);
=======
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ CORRECT - Remove extra "/api"
  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  // ✅ CORRECT - Remove extra "/api"  
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
>>>>>>> f18055594316013da11aff3180c0e45e4cad48ce
  }
}