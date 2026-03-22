import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AgentDashboardComponent } from './components/agent-dashboard/agent-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RiseTicketComponent } from './components/rise-ticket/rise-ticket.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { AdminManageTicketsComponent } from './components/admin-manage-tickets/admin-manage-tickets.component'; // New Component Import

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['EMPLOYEE'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: RiseTicketComponent },
      { path: 'raise-ticket', component: RiseTicketComponent }, // Corrected path to 'raise-ticket'
      { path: 'my-tickets', component: MyTicketsComponent }
    ]
  },
  {
    path: 'agent-dashboard',
    component: AgentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['AGENT'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MyTicketsComponent },
      { path: 'my-tickets', component: MyTicketsComponent }
    ]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardStatsComponent },
      { path: 'dashboard-stats', component: DashboardStatsComponent },
      { path: 'manage-tickets', component: AdminManageTicketsComponent } // New Admin Route
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

