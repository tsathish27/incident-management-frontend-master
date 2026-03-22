// src/app/components/rise-ticket/rise-ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-rise-ticket',
  templateUrl: './rise-ticket.component.html',
  styleUrls: ['./rise-ticket.component.css']
})
export class RiseTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', [Validators.required, Validators.pattern(/^(software|hardware|network)$/)]] // Ensure valid category
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.ticketForm.valid) {
      const { title, description, category } = this.ticketForm.value;
      if (!category) { // Additional check for category
        this.errorMessage = 'Please select a valid category.';
        return;
      }
      this.incidentService.createIncident(title, description, category)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Ticket raised successfully! Incident ID: ' + response.incident.id;
            this.ticketForm.reset();
          },
          error: (err) => {
            console.error('Error raising ticket:', err);
            this.errorMessage = err.error?.message || 'Failed to raise ticket. Please try again.';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
