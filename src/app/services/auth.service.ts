/* src/app/services/auth.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private authTokenKey = 'jwt_token';
  private userRoleKey = 'user_role';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  currentUserRole$ = this.currentUserRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!sessionStorage.getItem(this.authTokenKey);
  }

  private getRoleFromStorage(): string | null {
    return sessionStorage.getItem(this.userRoleKey);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        sessionStorage.setItem(this.authTokenKey, response.token);
        sessionStorage.setItem(this.userRoleKey, response.role);

        this.isAuthenticatedSubject.next(true);
        this.currentUserRoleSubject.next(response.role);
        this.redirectToDashboard(response.role);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        throw error;
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    return sessionStorage.getItem(this.userRoleKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.userRoleKey);
    this.isAuthenticatedSubject.next(false);
    this.currentUserRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  redirectToDashboard(role: string): void {
    switch (role) {
      case 'EMPLOYEE':
        this.router.navigate(['/employee-dashboard']);
        break;
      case 'AGENT':
        this.router.navigate(['/agent-dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}