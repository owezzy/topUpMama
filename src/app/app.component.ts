import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routeAnimations} from "../assets/animations/route.animations";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService

  ) {

  }
  authStatus$ = this.authService.userSubject.asObservable()
  signOut() {
    this.authService.logout()
  }
}
