import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {RoomService} from "src/app/modules/room/services/room.service";
import {Room} from "src/app/modules/home/types/userTypes";
import {SocketService} from "src/app/socket.service";
import {GetMessage, IsUserJoined, JoinType, KickUser, SendMessage} from "src/app/modules/room/types/room.types";

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<boolean>()
  private roomId = ''
  roomData$: BehaviorSubject<Room> = new BehaviorSubject<Room>({host: '', users: [''], _id: ''})
  isUserJoined: Subject<IsUserJoined> = new Subject<IsUserJoined>()
  inputValue = ''
  allMessages: GetMessage[] = []
  userId = ''
  constructor(private route: ActivatedRoute, private roomService: RoomService, private socketService: SocketService, private router: Router) {

  }

  ngOnInit(): void {
    this.socketService.listenLeaveUser().subscribe(res => console.log(res))
    this.route.params.subscribe(res => {
      this.roomId = res['id']
      return this.roomService.getRoomById(res['id']).pipe(
        takeUntil(this.destroy$)
      ).subscribe(res => {
        return this.roomData$.next(res)
      })
    })

    this.socketService.listenJoined(this.roomId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      return this.isUserJoined.next(res)
    })

    this.userId = localStorage.getItem('userId') || ''

    this.socketService.listenMessages().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.allMessages.push(res))

    this.socketService.listenUserKicked().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.id === this.userId) {
        const info = {
          data: this.roomId,
          user: this.userId
        }
        this.socketService.leaveFromRoom(info)
        this.router.navigate(['/home'])
      }
    })


  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  connectToRoom() {
    const joinData: JoinType = {
      data: this.roomId,
      user: {
        id: this.userId,
        username: localStorage.getItem('userName') || '',
      }
    }
    this.socketService.joinInRoom(joinData)
  }

  sendMessage() {
    if (this.inputValue) {
      const message: SendMessage = {
        data: this.inputValue,
        room: this.roomId,
        user: localStorage.getItem('userId') || ''
      }
      this.socketService.sendMessage(message)
      const uiMessage = {
        audio: this.inputValue,
        user: this.userId,
      }
      this.allMessages.push(uiMessage)
      this.inputValue = ''
    }
  }

  canKickUser(id: string) {
    return this.userId === this.roomData$.getValue().host && this.userId !== id;
  }

  kickUser(id: string) {
    const kickUser: KickUser = {
      data: this.roomId,
      user: {
        id,
        username: '',
        socketId: ''
      }
    }
    this.socketService.kickUserForAdmin(kickUser)
  }
}
