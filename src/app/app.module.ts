// // src/app/app.module.ts
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
// import { AgentDashboardComponent } from './components/agent-dashboard/agent-dashboard.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { AuthInterceptor } from './interceptors/auth.interceptor';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { RiseTicketComponent } from './components/rise-ticket/rise-ticket.component';
// import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
// import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
// import { AuthGuard } from './guards/auth.guard';
// import { RoleGuard } from './guards/role.guard';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     SignupComponent,
//     EmployeeDashboardComponent,
//     AgentDashboardComponent,
//     AdminDashboardComponent,
//     NavbarComponent,
//     RiseTicketComponent,
//     MyTicketsComponent,
//     DashboardStatsComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     ReactiveFormsModule,
//     FormsModule, // Added FormsModule for potential template-driven forms or ngModel
//     HttpClientModule
//   ],
//   providers: [
//     AuthGuard,
//     RoleGuard,
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: AuthInterceptor,
//       multi: true
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AgentDashboardComponent } from './components/agent-dashboard/agent-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RiseTicketComponent } from './components/rise-ticket/rise-ticket.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminManageTicketsComponent } from './components/admin-manage-tickets/admin-manage-tickets.component'; // New Component Import

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeDashboardComponent,
    AgentDashboardComponent,
    AdminDashboardComponent,
    NavbarComponent,
    RiseTicketComponent,
    MyTicketsComponent,
    DashboardStatsComponent,
    AdminManageTicketsComponent // Declare the new component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
