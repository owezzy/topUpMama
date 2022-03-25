import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import { UsersComponent } from './users/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { MapsUserLocationComponent } from './maps-user-location/maps-user-location.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {ConfirmDialogComponent} from "./users/confirm-dialog/confirm-dialog.component";
import {AuthService} from "./services/auth.service";
import {appInitializer, ErrorInterceptor, JwtInterceptor} from "./_helpers";
import { FooterComponent } from './footer/footer.component';
import {CountdownModule} from "ngx-countdown";
import { UserEditComponent } from './user-edit/user-edit.component';
import { Users2Component } from './users2/users2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignUpComponent,
    UsersComponent,
    MapsUserLocationComponent,
    ConfirmDialogComponent,
    FooterComponent,
    UserEditComponent,
    Users2Component
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    CountdownModule
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
