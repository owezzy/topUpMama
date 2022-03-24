import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, forkJoin } from 'rxjs'
import { User } from '../model/user'
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceUrl = `${environment.backendUrl}/users`

  constructor(private http: HttpClient) {}

  getCurrentUser(id:number): Observable<any> {
    return this.http.get(this.serviceUrl+`/${id}`)
  }
  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.serviceUrl)
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
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
