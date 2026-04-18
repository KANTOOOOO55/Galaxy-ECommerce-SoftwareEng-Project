import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/users/';
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');
    const email = localStorage.getItem('user_email');
    if (token) {
      this.currentUserSubject.next({ token, role: userRole, email: email });
    }
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        
        // In a real app, decode JWT to get role. Since we mock/return it,
        // we'll assume the client requests role from a 'me' endpoint or sets a default
        // For simplicity, we decode JWT locally if possible, or just look at username logic.
        // Quick dirty JWT decode for user role if it's there
        try {
          const payload = JSON.parse(atob(res.access.split('.')[1]));
          localStorage.setItem('user_role', payload.user_type || 'CONSUMER');
          localStorage.setItem('user_email', payload.email || credentials.email);
          this.currentUserSubject.next({ token: res.access, role: payload.user_type || 'CONSUMER', email: credentials.email });
        } catch(e) {
          localStorage.setItem('user_role', 'CONSUMER');
          this.currentUserSubject.next({ token: res.access, role: 'CONSUMER', email: credentials.email });
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    this.currentUserSubject.next(null);
  }

  getRole() {
    return localStorage.getItem('user_role');
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
