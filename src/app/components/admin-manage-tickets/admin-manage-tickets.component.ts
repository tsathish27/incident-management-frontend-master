import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { AuthService } from '../../services/auth.service'; // To get user role if needed for conditional display

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

interface Agent {
  username: string;
}

@Component({
  selector: 'app-admin-manage-tickets',
  templateUrl: './admin-manage-tickets.component.html',
  styleUrls: ['./admin-manage-tickets.component.css']
})
export class AdminManageTicketsComponent implements OnInit {
  allIncidents: Incident[] = [];
  agents: Agent[] = [];
  loadingIncidents: boolean = true;
  loadingAgents: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  userRole: string | null = null; // For display purposes if needed

  constructor(private incidentService: IncidentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.fetchAllIncidents();
    this.fetchAllAgents();
  }

  fetchAllIncidents(): void {
    this.loadingIncidents = true;
    this.errorMessage = '';
    this.incidentService.getIncidents().subscribe({
      next: (response) => {
        // As Admin, getIncidents will return ALL incidents
        this.allIncidents = response.incidents;
        this.loadingIncidents = false;
      },
      error: (err) => {
        console.error('Error fetching all incidents:', err);
        this.errorMessage = err.error?.message || 'Failed to fetch all incidents.';
        this.loadingIncidents = false;
      }
    });
  }

  fetchAllAgents(): void {
    this.loadingAgents = true;
    this.errorMessage = '';
    this.incidentService.getAllAgents().subscribe({
      next: (response) => {
        this.agents = response.agents;
        this.loadingAgents = false;
      },
      error: (err) => {
        console.error('Error fetching agents:', err);
        this.errorMessage = err.error?.message || 'Failed to fetch agents list.';
        this.loadingAgents = false;
      }
    });
  }

  onAssignAgent(incidentId: number, event: Event): void {
    this.successMessage = '';
    this.errorMessage = '';

    const selectElement = event.target as HTMLSelectElement;
    const newAgentUsername = selectElement.value;

    if (!newAgentUsername || newAgentUsername === "") {
        // If "Select Agent" is chosen, do nothing
        return;
    }

    this.incidentService.assignIncident(incidentId, newAgentUsername).subscribe({
      next: (response) => {
        this.successMessage = 'Incident assigned successfully!';
        this.fetchAllIncidents(); // Refresh incidents to show new assignment
      },
      error: (err) => {
        console.error('Error assigning incident:', err);
        this.errorMessage = err.error?.message || 'Failed to assign incident.';
        // Optionally revert the dropdown selection if assignment fails
        selectElement.value = this.allIncidents.find(i => i.id === incidentId)?.assignedTo.username || '';
      }
    });
  }

  // Helper to format date for display
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}