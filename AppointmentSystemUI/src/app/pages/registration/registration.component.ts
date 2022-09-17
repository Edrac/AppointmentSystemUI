import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiUserService } from 'src/app/core/services/api/user/api.user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private _subscriptions: Subscription = new Subscription();
  public registrationForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _apiUserService: ApiUserService,
  ) {
    this.registrationForm = _formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        id: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }
    );
  }


  ngOnInit(): void {
  }

  save(): void {
    let user: User = {
      id: this.registrationForm.controls['id'].value,
      firstName: this.registrationForm.controls['firstName'].value,
      lastName: this.registrationForm.controls['lastName'].value,
    };
    this._subscriptions.add(
      this._apiUserService.createUser(user)
        .subscribe(
          (resp) => {
            console.log('resp', resp);
          }
        )
    );
  }

}
