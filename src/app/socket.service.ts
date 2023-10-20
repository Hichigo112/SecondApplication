import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {
  GetMessage,
  IsUserJoined,
  JoinType,
  KickUser,
  LeaveUser,
  SendMessage, UserInfo
} from "src/app/modules/room/types/room.types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  askToJoin(data: {}): void {
    this.socket.emit('ask-to-join', data);
  }

  joinInRoom(joinData: JoinType): void {
    this.socket.emit('join', joinData)
  }

  listenJoined(roomId: string): Observable<IsUserJoined> {
    return this.socket.fromEvent(roomId)
  }

  sendMessage(message: SendMessage): void {
    this.socket.emit('audio-stream', message)
  }

  listenMessages(): Observable<GetMessage> {
    return this.socket.fromEvent('audio-stream')
  }

  kickUserForAdmin(kickData: KickUser): void {
    this.socket.emit('kick', kickData)
  }

  listenUserKicked(): Observable<IsUserJoined> {
    return this.socket.fromEvent('kicked')
  }

  leaveFromRoom(user: LeaveUser): void {
    this.socket.emit('leave', user)
  }

  listenAskToJoin(id: string): Observable<UserInfo> {
    return this.socket.fromEvent(id)
  }

  acceptUserToJoinRoom(user: UserInfo): void {
    this.socket.emit('accept', {user})
  }

  declineUserToJoinRoom(user: UserInfo): void {
    this.socket.emit('decline', {user})
  }

  listenApproveOrDeclined(id: string): Observable<boolean> {
    return this.socket.fromEvent(id)
  }

  deleteRoom(data: string) : void{
    this.socket.emit('delete', {data})
  }

  testListenRoom(roomId: string) {
    return this.socket.fromEvent(roomId)
  }
}
