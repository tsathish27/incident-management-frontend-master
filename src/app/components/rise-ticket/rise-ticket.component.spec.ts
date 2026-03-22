import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiseTicketComponent } from './rise-ticket.component';

describe('RiseTicketComponent', () => {
  let component: RiseTicketComponent;
  let fixture: ComponentFixture<RiseTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiseTicketComponent]
    });
    fixture = TestBed.createComponent(RiseTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
