import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MapsUserLocationComponent} from "./maps-user-location/maps-user-location.component";
import {AuthGuard} from "./guards/auth.guard";
import {Users2Component} from "./users2/users2.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'location', component: MapsUserLocationComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'users', component: Users2Component, canActivate: [AuthGuard] },
  {path: 'signup', component: SignUpComponent},
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      onSameUrlNavigation: "reload"
    }),
  ],

})
export class AppRoutingModule { }
