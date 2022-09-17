import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiAppointmentService } from 'src/app/core/services/api/appointment/api.appointment.service';
import { Appointments } from 'src/app/shared/interfaces/appointments';

@Component({
  selector: 'app-current-appointments',
  templateUrl: './current-appointments.component.html',
  styleUrls: ['./current-appointments.component.scss']
})
export class CurrentAppointmentsComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  public registrationForm: FormGroup;
  public message: string | undefined;
  public messageType: string = 'info';
  public appointments: Array<Appointments> = new Array();

  constructor(
    private _formBuilder: FormBuilder,
    private _apiAppointmentService: ApiAppointmentService,
    private _router: Router,
  ) {
    this.registrationForm = _formBuilder.group(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }
    );
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  getCurrentBookings(): void {
    this._subscriptions.add(
      this._apiAppointmentService.getAppointments(this.registrationForm.controls['id'].value)
        .subscribe(
          (resp: Array<Appointments>) => {
            if (resp?.length == 0) {
              this.message = 'No appointments found';
              this.messageType = 'info';
            }
            this.appointments = resp;
          },
          (error) => {
            this.message = error;
            this.messageType = 'danger';
          }
        )
    );
  }

}
