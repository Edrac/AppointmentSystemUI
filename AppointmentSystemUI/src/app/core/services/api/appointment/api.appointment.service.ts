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


  getAppointments(id: string): Observable<Array<Appointments>>;
  getAppointments(startDate: Date | string, endDate?: Date): Observable<Array<Appointments>> {
    let params: BaseURLParams;
    if (typeof startDate == 'string') {
      params = {
        url: this._apiHttpService.createUrl(`Appointments/${startDate}`),
      }
    } else {
      params = {
        url: this._apiHttpService.createUrl(`Appointments/${startDate}/${endDate}`),
      }
    }
    return this._apiHttpService.get(params);
  }

}
