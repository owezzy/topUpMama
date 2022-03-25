import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {Observable, forkJoin, map, tap} from 'rxjs'
import {User, userDetails} from '../model/user'
import {environment} from "../../../environments/environment";
import {UiService} from "../../services/ui.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceUrl = `${environment.backendUrl}/users`

  constructor(private http: HttpClient,
              private uiService: UiService) {}

  getCurrentUser(id:number): Observable<any> {
    return this.http.get(this.serviceUrl+`/${id}`)
  }
  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.serviceUrl)
  }

  updateUser(user: User, userDetail?:userDetails): Observable<User> {
    console.log('--------updateUser------', user, userDetail)
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, userDetail).pipe(
      map(resp => {
        // console.log(resp)
        return resp
      }),
      tap(() => {
        const config = this.uiService.toastConfig()
        this.uiService.showToast('User Updated Successful', 'Close', config)
      }));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.serviceUrl, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(users.map(user => this.http.delete<User>(`${this.serviceUrl}/${user.id}`)))
  }
}
