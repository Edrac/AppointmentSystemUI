import { TestBed } from '@angular/core/testing';

import { ApiAppointmentService } from './api.appointment.service';

describe('ApiService', () => {
  let service: ApiAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
