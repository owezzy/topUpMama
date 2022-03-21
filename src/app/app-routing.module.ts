import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'signup', component: SignUpComponent},
  { path: '**', component: PageNotFoundComponent },

]

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    }),
  ],

})
export class AppRoutingModule { }
