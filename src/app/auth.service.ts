import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl; // localhost or Vercel URL

  constructor(private http: HttpClient) {}

  signup(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/signup`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, data);
  }
}
