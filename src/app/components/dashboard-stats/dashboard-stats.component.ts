// src/app/components/dashboard-stats/dashboard-stats.component.ts
import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css']
})
export class DashboardStatsComponent implements OnInit {
  stats: any = {
    open: 0,
    resolved: 0,
    breaches: 0
  };
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.fetchDashboardStats();
  }

  fetchDashboardStats(): void {
    this.loading = true;
    this.errorMessage = '';
    this.incidentService.getDashboardStats().subscribe({
      next: (response) => {
        this.stats = response.stats;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboard stats:', err);
        this.errorMessage = err.error?.message || 'Failed to fetch dashboard statistics.';
        this.loading = false;
      }
    });
  }
}