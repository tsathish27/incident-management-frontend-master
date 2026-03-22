import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageTicketsComponent } from './admin-manage-tickets.component';

describe('AdminManageTicketsComponent', () => {
  let component: AdminManageTicketsComponent;
  let fixture: ComponentFixture<AdminManageTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageTicketsComponent]
    });
    fixture = TestBed.createComponent(AdminManageTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
