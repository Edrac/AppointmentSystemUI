import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAppointmentsComponent } from './current-appointments.component';

describe('CurrentAppointmentsComponent', () => {
  let component: CurrentAppointmentsComponent;
  let fixture: ComponentFixture<CurrentAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
