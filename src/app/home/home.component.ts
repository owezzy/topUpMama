import { Component, OnInit } from '@angular/core';
import {UserService} from "../users/services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styles: [
    `.example-card {
      max-width: 400px;
    }

    `
  ]
})
export class HomeComponent implements OnInit {
  currentUser$!: Observable<any>
  localData: any
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getCurrentUser(4)
      .pipe(
      (data) => this.localData = data
    )
  }

}
