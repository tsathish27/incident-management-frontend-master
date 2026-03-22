import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createIncident(title: string, description: string, category: string): Observable<any> {
    const payload = { title, description, category }; // Include category in the payload
    return this.http.post(`${this.apiUrl}/incidents`, payload);
  }

  getIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidents`);
  }

  updateIncidentStatus(id: number, status: string): Observable<any> {
    const payload = { status };
    return this.http.put(`${this.apiUrl}/incidents/${id}/status`, payload);
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/dashboard`);
  }

  /**
   * Assigns an incident to a new agent.
   * @param incidentId The ID of the incident to assign.
   * @param agentUsername The username of the agent to assign the incident to.
   * @returns An Observable with the API response.
   */
  assignIncident(incidentId: number, agentUsername: string): Observable<any> {
    const payload = { agentUsername };
    return this.http.put(`${this.apiUrl}/incidents/${incidentId}/assign`, payload);
  }

  /**
   * Retrieves a list of all agents.
   * @returns An Observable with the list of agents.
   */
  getAllAgents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents`);
  }
}

