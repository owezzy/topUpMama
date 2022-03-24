import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, map, Observable, shareReplay, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {calcDateDiff} from "../../assets/common-functions";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
      .timer {
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 1em;
        letter-spacing: -1px;
        margin: 5px;
      }
      .timer span {
        font-size: 1em;
        margin: 5px;
      }
    `
  ]
})
export class FooterComponent implements OnDestroy  {
  constructor() {
    this.timeLeft$ = interval(1000).pipe(
      map(x => calcDateDiff()),
      shareReplay(1)
    );
  }

  public timeLeft$: Observable<FooterComponent>;

  private subscription!: Subscription;



  public secondsToDay!:number;
  public minutesToDay!: number;
  public hoursToDay!: number;
  public daysToDay!: number;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
