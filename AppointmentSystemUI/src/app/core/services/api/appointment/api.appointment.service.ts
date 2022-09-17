import { Injectable } from '@angular/core';
import { BaseURLParams } from 'src/app/shared/interfaces/base-params';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../api-http.service';
import { Appointments } from 'src/app/shared/interfaces/appointments';

@Injectable({
  providedIn: 'root'
})
export class ApiAppointmentService {

  constructor(
    private _apiHttpService: ApiHttpService,
  ) { }


  getAppointments(): Observable<Appointments> {
    let params: BaseURLParams = {
      url: this._apiHttpService.createUrl('appointments'),
    }
    return this._apiHttpService.get(params);
  }

}
