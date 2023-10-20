import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_INSTANCE} from "src/app/constants/api";
import {Room} from "src/app/modules/home/types/userTypes";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  createRoom(users: string[]): Observable<Room<string>> {
    return this.http.post<Room<string>>(`${API_INSTANCE}/rooms`, {
      host: localStorage.getItem('userId'),
      users: JSON.stringify(users)
    })
  }

  getRoomById(id: string): Observable<Room<string>> {
    return this.http.get<Room<string>>(`${API_INSTANCE}/rooms/${id}`)
  }
}
