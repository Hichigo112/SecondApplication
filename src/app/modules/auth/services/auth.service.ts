import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseUser} from "src/app/modules/auth/types/authTypes";
import {Router} from "@angular/router";
import {API_INSTANCE} from "src/app/constants/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  createUser(name: string, password: string) {
    return this.http.post<ResponseUser>(`${API_INSTANCE}/auth/signup`, {
      password,
      username: name
    })
  }

  loginUser(name: string, password: string) {
    return this.http.post<ResponseUser>(`${API_INSTANCE}/auth/signin`, {
      password,
      username: name,
    })
  }

  refresh() {
    return this.http.get<ResponseUser>(`${API_INSTANCE}/auth/refresh`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`}
    })
  }

  setUserInfo(res: ResponseUser) {
    const {accessToken, refreshToken, id, username} = res
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userId', id)
    localStorage.setItem('userName', username)
  }
}
