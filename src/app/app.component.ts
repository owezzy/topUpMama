import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {routeAnimations} from "../assets/animations/route.animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations],

})
export class AppComponent {
  title = 'topUpMama';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
}
