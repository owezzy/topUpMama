import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UiService} from "../services/ui.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private uiService: UiService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    if (user.isLoggedIn) {
      // console.error(user)
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() =>{
        const config = this.uiService.toastConfig()
        this.uiService.showToast('You Need to Login to Continue', 'Close', config)
      });
      return false;
    }
  }

}
