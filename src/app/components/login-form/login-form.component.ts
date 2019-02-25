import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })

  @Output('loginSubmit')
  submit = new EventEmitter<{username: string, password: string}>()

  constructor() { }

  public hasErrors(fieldName) {
    return this.loginForm.controls[fieldName].touched && 
      this.loginForm.controls[fieldName].errors
  }

  public errors(fieldName): any {
    return this.loginForm.controls[fieldName].errors
  }

  public classForField(fieldName) {
    const fieldValid = this.loginForm.controls[fieldName].valid
    const fieldTouched = this.loginForm.controls[fieldName].touched
    return [
      'form-control',
      fieldValid ? 'is-valid' : '',
      (!fieldValid && fieldTouched) ? 'is-invalid': ''
    ]
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submit.emit(this.loginForm.value)
  }

}
