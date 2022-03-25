import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {UserService} from "../users/services/user.service";
import {Observable, of} from "rxjs";
import {AuthService} from "../services/auth.service";
import {User, userDetails} from "../users/model/user";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styles: [
    `.example-card {
      max-width: 400px;
    }

    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  userDetails: userDetails = {
    name: '',
    job_title: '',
  };

  onSubmitted(user: userDetails) {

    const localUser = this.authService.userValue
    this.userDetails = user;
    console.log(localUser)
    console.log(this.userDetails)
    this.userService.updateUser(localUser, user).subscribe()
  }

  currentUser$!: Observable<any>
  localData: any
  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.localData = this.authService.userValue
    this.currentUser$ = this.userService.getCurrentUser(this.localData.id)
    console.log(this.localData)
  }



}
