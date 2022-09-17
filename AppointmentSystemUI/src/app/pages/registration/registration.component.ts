import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.registrationForm = _formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        LastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Id: new FormControl('', [Validators.required, Validators.minLength(3)]),
      }
    );
  }


  ngOnInit(): void {
  }

  save(): void {

  }

}
