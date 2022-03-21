import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(userObject: object): Observable<any>{
    return this.httpClient.post(`${environment.backendUrl}/login`,{
      ...userObject
    })
  }

  signUp(userObject: object): Observable<any>{
    return this.httpClient.post(`${environment.backendUrl}/register`,{
      ...userObject
    })
  }
}
