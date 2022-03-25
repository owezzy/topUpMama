import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmailValidation, PasswordValidation} from "../../assets/common.validation";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
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
    }
    `
  ]
})
export class SignUpComponent implements OnChanges {

  signUpForm = this.formBuilder.group({
    email: ['', EmailValidation],
    password: ['', PasswordValidation],
  });
  hide = true;
  allowSignUp = true;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('------------submittedForm---------------',this.signUpForm.errors)
    }


  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }


  signUp() {
    const submittedForm = this.signUpForm.value
    console.log('------------submittedForm---------------',submittedForm)
    this.authService.signUp(submittedForm).subscribe(
      response => {
        console.log('---------response------------', response)

      },
      ()=>{},
      () => this.router.navigate(['/home'])

    )
  }
}
