import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {data, user} from '../app/constants/askToJoin'
import {ActivatedRoute} from "@angular/router";
import {
  GetMessage,
  IsUserJoined,
  JoinType,
  KickUser,
  LeaveUser,
  SendMessage
} from "src/app/modules/room/types/room.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  askToJoin() {
    this.socket.emit('ask-to-join', {data: data, user: user});
  }

  joinInRoom(joinData: JoinType) {
    this.socket.emit('join', joinData)
  }

  listenJoined(roomId: string): Observable<IsUserJoined> {
    return this.socket.fromEvent(roomId)
  }

  sendMessage(message: SendMessage) {
    this.socket.emit('audio-stream', message)
  }

  listenMessages(): Observable<GetMessage> {
    return this.socket.fromEvent('audio-stream')
  }

  kickUserForAdmin(kickData: KickUser) {
    this.socket.emit('kick', kickData)
  }

  listenUserKicked(): Observable<IsUserJoined> {
    return this.socket.fromEvent('kicked')
  }

  leaveFromRoom(user: LeaveUser) {
    this.socket.emit('leave', user)
  }

  listenLeaveUser() {
    return this.socket.fromEvent('leaved')
  }
}
