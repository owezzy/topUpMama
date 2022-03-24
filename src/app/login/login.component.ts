import { Component, OnInit } from '@angular/core';
import {EmailValidation, PasswordValidation} from "../../assets/common.validation";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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
      background-color: #c7c7c7;
      height: 100%;
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
  returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
   this.route.queryParamMap.subscribe((queryParams) => this.returnUrl = queryParams.get('returnUrl') || '/')

  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    const loginFormData = this.loginForm.value
    // console.log('---------loginFormData------------', loginFormData)
    this.authService.login(loginFormData).subscribe(
      response => {
        // console.log('---------Login-response------------', response)
        this.router.navigate([this.returnUrl]);

      }
    )
  }
}
