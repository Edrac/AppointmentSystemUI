import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiUserService } from 'src/app/core/services/api/user/api.user.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  public registrationForm: FormGroup;
  public errorMessage: string | undefined;
  constructor(
    private _formBuilder: FormBuilder,
    private _apiUserService: ApiUserService,
    private _router: Router,
  ) {
    this.registrationForm = _formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        id: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }
    );
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
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
            this._router.navigate(['/booking'])
          },
          (error) => {
            this.errorMessage = error;
          }
        )
    );
  }

}
