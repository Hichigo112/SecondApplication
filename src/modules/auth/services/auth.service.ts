import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseSignUp} from "src/modules/auth/types/authTypes";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  createUser(name: string, password: string) {
    return this.http.post<ResponseSignUp>('http://localhost:3000/auth/signup', {
      password,
      username: name
    })
  }

  setUserInfo(res: ResponseSignUp) {
    localStorage.setItem('accessToken', res.accessToken)
    localStorage.setItem('refreshToken', res.accessToken)
    // this.router.navigate(['/messenger'])
  }
}
