// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles = route.data['roles'] as Array<string>; // Get roles from route data

    return this.authService.currentUserRole$.pipe(
      take(1), // Take the current role and complete
      map(userRole => {
        if (userRole && requiredRoles.includes(userRole)) {
          return true; // User has one of the required roles, allow access
        } else {
          // User does not have the required role, redirect to unauthorized or login
          this.authService.logout(); // Log out if role mismatch for security
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}

