import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, EMPTY, map, Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {DefaultUser, User} from "../users/model/user";
import {Router, RouterStateSnapshot} from "@angular/router";
import {LOCAL_STORAGE_TOKEN} from "./local-storage-config";
import {UiService} from "./ui.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user!: Observable<User>;
  private AuthStateKey = 'authState';
  userSubject!: BehaviorSubject<User>;
  refreshTokenTimeout: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE_TOKEN) private storage: Storage,
    private uiService: UiService
  ) {
    this.userSubject = new BehaviorSubject<User>(DefaultUser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject?.value;
  }

  supported(): Observable<boolean> {
    return this.storage !== null
      ? of(true)
      : throwError(() => 'Local Storage Not Supported');
  }

  getUserAuthState(): Observable<any> {
    return this.supported().pipe(
      map((_) => this.storage.getItem(this.AuthStateKey)),
      map((value: string | null) => (value ? JSON.parse(value) : {}))
    );
  }

  login(userObject: object): Observable<any> {
    return this.httpClient.post(`${environment.backendUrl}/register`, {
      ...userObject
    }, {withCredentials: false})
      .pipe(map(user => {
          // console.error('login Response', user)
        const value = {
            ...user,
          isLoggedIn: true
        }
          this.userSubject.next(value);
          this.startRefreshTokenTimer();
          this.storage.setItem(this.AuthStateKey, JSON.stringify(value))
          return user;
        }),
        tap(() => {
          const config = this.uiService.toastConfig()
          this.uiService.showToast('Login Successful', 'Close', config)
        })
      );
  }

  signUp(userObject: object): Observable<any> {
    return this.httpClient.post(`${environment.backendUrl}/register`, {
      ...userObject
    }, {withCredentials: false})
      .pipe(map(user => {
          console.error('signup Response', user)
          const value = {
            ...user,
            isLoggedIn: true
          }
          this.userSubject.next(value);
          this.startRefreshTokenTimer();

          return user;
        }),
        tap((value: any) => {
          const config = this.uiService.toastConfig()
          this.uiService.showToast('Registration Successful', 'Close', config)
          this.storage.setItem(this.AuthStateKey, JSON.stringify(value))
        })
      )
  }

  logout(state?: RouterStateSnapshot) {
    this.stopRefreshTokenTimer();
    this.userSubject.next(DefaultUser);
    this.storage.setItem(this.AuthStateKey, JSON.stringify(DefaultUser))
    this.router.navigate(['/login'], { queryParams: { returnUrl: state?.url }}).then(
      () => {
        const config = this.uiService.toastConfig()
        this.uiService.showToast('Logout Successful', 'Close', config)

      }
    );
  }

  refreshToken() {
    // @ts-ignore
    const localData:User = JSON.parse(this.storage.getItem(this.AuthStateKey))

    return this.httpClient.get<any>(`${environment.backendUrl}/users/${localData.id}`)
      .pipe(map((user) => {
        // this.userSubject.next(user);
        console.log(user)
        // @ts-ignore

        const currentUser =  {
          ...localData,
          isLoggedIn: true,
          ...user.data
        }
          console.log('localUser',localData)
          console.log('currentUser',currentUser)
        this.userSubject.next(currentUser)
          this.storage.setItem(this.AuthStateKey, JSON.stringify(currentUser))
          this.startRefreshTokenTimer();
        return user;
      }),
        tap(() =>{
          const config = this.uiService.toastConfig()
          this.uiService.showToast('Token Refreshed Successful', 'Close', config)
        }));
  }

  private startRefreshTokenTimer() {
    // set a timeout to refresh the token
    //10mins = 600000ms
    const timeout = 600000
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
