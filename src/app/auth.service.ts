import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/login`, { email, password });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/signup`, { name, email, password });
  }
}


