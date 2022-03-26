import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {UiService} from "../services/ui.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthService,
      private uiService: UiService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authenticationService.logout();
            }
            if ([404].includes(err.status)){
              const config = this.uiService.toastConfig()
              this.uiService.showToast('Unknown Error, Please Contact Dev Team!', 'Close', config)
            }

            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            const config = this.uiService.toastConfig()
            this.uiService.showToast(err.error.error, 'Close', config)
            return throwError(error);
        }))
    }
}
