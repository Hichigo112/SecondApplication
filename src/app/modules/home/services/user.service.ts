import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_INSTANCE} from "src/app/constants/api";
import {User} from "src/app/modules/home/types/userTypes";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_INSTANCE}/users/${username}`)
  }
}
