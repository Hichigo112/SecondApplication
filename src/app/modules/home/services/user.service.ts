import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_INSTANCE} from "src/app/constants/api";
import {AuthService} from "src/app/modules/auth/services/auth.service";
import {User} from "src/app/modules/home/types/userTypes";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  findUser(username: string) {
    return this.http.get<User[]>(`${API_INSTANCE}/users/${username}`)
  }

  getCurrentInfo() {
    return this.http.get(`${API_INSTANCE}/users/me`)
  }
}
