import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { AuthService } from '../../services/auth.service';

interface Incident {
  id: number;
  title: string;
  description: string;
  status: string;
  createdBy: { username: string };
  assignedTo: { username: string };
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  escalated: boolean;
}

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  incidents: Incident[] = [];
  userRole: string | null = null;
  loading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private incidentService: IncidentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.fetchIncidents();
  }

  fetchIncidents(): void {
    this.loading = true;
    this.errorMessage = '';
    this.incidentService.getIncidents().subscribe({
      next: (response) => {
        this.incidents = response.incidents;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching incidents:', err);
        this.errorMessage = err.error?.message || 'Failed to fetch tickets.';
        this.loading = false;
      }
    });
  }

  // Modified updateStatus method
  updateStatus(incidentId: number, event: Event): void { // Receive the full event object
    this.successMessage = '';
    this.errorMessage = '';

    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value; // Safely get the value here

    if (!newStatus || newStatus === "") {
        // Handle case where no status is selected (e.g., the disabled option)
        return;
    }

    if (this.userRole === 'AGENT' || this.userRole === 'ADMIN') { // Admin can also update status
      this.incidentService.updateIncidentStatus(incidentId, newStatus).subscribe({
        next: (response) => {
          this.successMessage = 'Incident status updated successfully!';
          this.fetchIncidents(); // Refresh the list
        },
        error: (err) => {
          console.error('Error updating status:', err);
          this.errorMessage = err.error?.message || 'Failed to update status.';
        }
      });
    } else {
      this.errorMessage = 'You are not authorized to update incident status.';
    }
  }

  // Helper to format date for display
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}