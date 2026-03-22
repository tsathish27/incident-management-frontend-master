import { Component, Input, OnInit, OnChanges } from '@angular/core'; // Import OnChanges
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges { // Implement OnChanges
  @Input() userRole: string | null = null;
  navLinks: { path: string; label: string; icon: string }[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // This will run once when component initializes.
    this.generateNavLinks();
  }

  ngOnChanges(): void {
    // This will run when any @Input() property changes, ensuring links are updated if role changes.
    this.generateNavLinks();
  }

  private generateNavLinks(): void {
    if (!this.userRole) {
      this.navLinks = [];
      return;
    }

    // Base path for each dashboard, assuming sub-routes are relative
    let basePath = '';
    switch (this.userRole) {
      case 'EMPLOYEE':
        basePath = '/employee-dashboard';
        this.navLinks = [
          { path: `${basePath}/home`, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }, // Heroicon: Home
          { path: `${basePath}/raise-ticket`, label: 'Raise Ticket', icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' }, // Heroicon: Plus Circle
          { path: `${basePath}/my-tickets`, label: 'My Tickets', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' } // Heroicon: Document Text
        ];
        break;
      case 'AGENT':
        basePath = '/agent-dashboard';
        this.navLinks = [
          { path: `${basePath}/home`, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }, // Heroicon: Home
          { path: `${basePath}/my-tickets`, label: 'My Tickets', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' } // Heroicon: Document Text
        ];
        break;
      case 'ADMIN':
        basePath = '/admin-dashboard';
        this.navLinks = [
          { path: `${basePath}/home`, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }, // Heroicon: Home
          { path: `${basePath}/dashboard-stats`, label: 'Dashboard Stats', icon: 'M16 8v8m-4-5v5m-4-2v2m-2-6a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' }, // Heroicon: Chart Bar
          { path: `${basePath}/manage-tickets`, label: 'Manage Tickets', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0h4m-4 0H7M6 18h11a1 1 0 001-1V8a1 1 0 00-1-1H6a1 1 0 00-1 1v9a1 1 0 001 1z' } // Heroicon: Clipboard List
        ];
        break;
      default:
        this.navLinks = [];
        break;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
