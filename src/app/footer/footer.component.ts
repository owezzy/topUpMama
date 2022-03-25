import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {interval, map, Observable, shareReplay, Subscription} from "rxjs";

import {CountdownConfig} from "ngx-countdown";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
    `
      .timer {
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 1em;
        margin: 5px;
      }
      .timer span {
        font-size: 1em;
        margin: 5px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit,OnDestroy  {
  public timeLeft$: Observable<any>;

  subscription!: Subscription;
  minutes: number = 10

  config: CountdownConfig = { stopTime: new Date().getTime() + this.minutes * 60000 };

  constructor(
    private authService: AuthService
  ) {
    this.timeLeft$ = interval( 1000).pipe(
      map(() => new Date().getTime()),
    shareReplay(1),
  );

  }

  show = this.authService.userSubject.asObservable()
  ngOnInit(): void {
    //emit value in sequence every 10 minutes
    const source = interval(this.minutes* 60000);
    this.subscription = source.subscribe(val => this.resetStop());
  }


  resetStop() {
    console.log('----resetStop-------')
    return this.config = { stopTime: new Date().getTime() + this.minutes * 60000 };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
