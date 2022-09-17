import { Injectable } from '@angular/core';
import { BaseURLParams } from 'src/app/shared/interfaces/base-params';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../api-http.service';
import { User } from 'src/app/shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(
    private _apiHttpService: ApiHttpService,
  ) { }


  getUser(): Observable<User> {
    let params: BaseURLParams = {
      url: this._apiHttpService.createUrl('users'),
    }
    return this._apiHttpService.get(params);
  }

}
