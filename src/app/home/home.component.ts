import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styles: [
    `.example-card {
      max-width: 400px;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }`
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
