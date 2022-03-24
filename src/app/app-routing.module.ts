import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {UsersComponent} from "./users/users.component";
import {MapsUserLocationComponent} from "./maps-user-location/maps-user-location.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'location', component: MapsUserLocationComponent, canActivate: [AuthGuard] },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {path: 'signup', component: SignUpComponent},
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      onSameUrlNavigation: "ignore"
    }),
  ],

})
export class AppRoutingModule { }
