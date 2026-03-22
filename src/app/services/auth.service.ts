/* src/app/services/auth.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  // DEMO ⚠️: Hardcoded URL — Copilot will suggest environment.apiUrl
  private apiUrl = 'http://localhost:8080/auth';

  // Tokens are stored only in memory (never in localStorage/sessionStorage)
  // to reduce XSS exposure. The session ends when the page is closed or
  // refreshed, which is acceptable given the security-sensitive nature of
  // this application.
  private token: string | null = null;
  private userRole: string | null = null;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserRoleSubject = new BehaviorSubject<string | null>(null);
  currentUserRole$ = this.currentUserRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.token = response.token;
        this.userRole = response.role;
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
    return this.token;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  logout(): void {
    this.token = null;
    this.userRole = null;
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