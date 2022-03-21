import { Component, OnInit } from '@angular/core';
import {EmailValidation, PasswordValidation} from "../../assets/common.validation";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
    ` .sign-up-text {
      text-align: center;
      line-height: 1.5;
      margin: 0;
      padding: 5px;
    }

    .sign-up-title {
      font-weight: bold;
      font-size: 25px;
      color: #2c2c2cd9;
    }
    .sign-up-subtitle {
      color: rgb(0 0 0 / 66%);
      font-size: 16px;
      text-align: center;
    }

    #sign-up-container {
    }


    .sign-up-buttons {
      padding-top: 15px
    }

    button {
      margin-bottom: 8px;
    }

    @media only screen and (min-width: 600px) {
      #sign-up-container {
        padding-top: 5vh;
      }
    }`
  ]
})
export class LoginComponent implements OnInit {

  loginForm =  this.formBuilder.group({
    email: ['', EmailValidation],
    password: ['', PasswordValidation],
  });
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    const loginFormData = this.loginForm.value
    console.log('---------loginFormData------------', loginFormData)
  }
}
