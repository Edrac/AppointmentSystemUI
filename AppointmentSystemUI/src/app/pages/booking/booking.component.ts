import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiAppointmentService } from 'src/app/core/services/api/appointment/api.appointment.service';
import { Appointments } from 'src/app/shared/interfaces/appointments';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  private _subscriptions: Subscription = new Subscription();
  public registrationForm: FormGroup;
  public errorMessage: string | undefined;
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

  save(): void {
    this._subscriptions.add(
      this._apiAppointmentService.getAppointments(this.registrationForm.controls['id'].value)
        .subscribe(
          (resp: Array<Appointments>) => {

          },
          (error) => {
            this.errorMessage = error;
          }
        )
    );
  }

}
