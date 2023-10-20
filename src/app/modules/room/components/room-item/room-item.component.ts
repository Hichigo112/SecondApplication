import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, catchError, Subject, takeUntil, throwError} from "rxjs";
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
  roomData$: BehaviorSubject<Room<IsUserJoined[]>> = new BehaviorSubject<Room<IsUserJoined[]>>({host: '', users: [], _id: ''})
  isUserJoined = false
  inputValue = ''
  allMessages: GetMessage[] = []
  userId = ''
  username =''
  constructor(private route: ActivatedRoute, private roomService: RoomService, private socketService: SocketService, private router: Router) {

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''
    this.username = localStorage.getItem('userName') || ''

    this.route.params.subscribe(res => {
      this.roomId = res['id']
      this.roomService.getRoomById(this.roomId).pipe(
        catchError(err => {
          this.router.navigate(['home'])
          return throwError(() => err)
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        if (res !== null) {
            const transformRes = {
                ...res,
                users: JSON.parse(res.users)
            }
            this.roomData$.next(transformRes)
            if (res.users.includes(this.userId) || res.host.includes(this.userId)) {
                this.connectToRoom()
            }
        } else {
            this.router.navigate(['home'])
        }
      })
    })

    this.socketService.listenJoined(this.roomId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.getRoomData()
      return this.isUserJoined = true
    })


    this.socketService.listenMessages().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.allMessages.push(res))

    this.socketService.listenUserKicked().pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res.id === this.userId) {
        this.leaveUser()
      } else {
        this.getRoomData()
      }
    })

    this.socketService.listenAskToJoin(this.userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (this.roomData$.getValue().host === this.userId) {
        const isAccept = confirm(`Пользователь с именем ${res.username} хочет присоединиться к комнате`)
        isAccept ? this.socketService.acceptUserToJoinRoom(res) : this.socketService.declineUserToJoinRoom(res)
      }
    })

    this.socketService.listenApproveOrDeclined(this.userId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      if (res) {
        this.connectToRoom()
        this.isUserJoined = true
      }
    })
  }



  connectToRoom(): void  {
    const joinData: JoinType = {
      data: this.roomId,
      user: {
        id: this.userId,
        username: this.username,
      }
    }
    this.socketService.joinInRoom(joinData)
  }

  sendMessage(): void  {
    if (this.inputValue) {
      const message: SendMessage = {
        data: this.inputValue,
        room: this.roomId,
        user: this.userId
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

  canKickUser(id: string): boolean {
    return this.userId === this.roomData$.getValue().host && this.userId !== id;
  }

  kickUser(id: string, isRoomDelete = false): void  {
    const kickUser: KickUser = {
      data: this.roomId,
      user: {
        id,
        username: '',
        socketId: ''
      }
    }
    this.socketService.kickUserForAdmin(kickUser)
    if (!isRoomDelete) {
      const updatedUsers = this.roomData$.getValue().users.filter((user: IsUserJoined) => user.id !== id)
      this.roomData$.next({
        ...this.roomData$.getValue(),
        users: updatedUsers
      })
    }
  }

  getRoomData(): void  {
    this.roomService.getRoomById(this.roomId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      const transformRes = {
        ...res,
        users: JSON.parse(res.users)
      }
      this.roomData$.next(transformRes)
    })
  }

  askToJoin(): void  {
    const roomData = {
      host: this.roomData$.getValue().host,
      users: JSON.stringify(this.roomData$.getValue().users),
      _id: this.roomData$.getValue()._id
    }

    const userData = {
      id: this.userId,
      username: this.username
    }

    this.socketService.askToJoin({data: roomData, user: userData})
  }

  leaveUser(): void {
      const info = {
          data: this.roomId,
          user: this.userId
      }
      this.socketService.leaveFromRoom(info)
      this.router.navigate(['/home'])
  }

  deleteRoom(): void {
    const users = this.roomData$.getValue().users
    users.forEach((user,index) => {
      this.kickUser(user.id, true)
      if (index === users.length - 1) {
        this.leaveUser()
        this.socketService.deleteRoom(this.roomData$.getValue()._id)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
    this.roomData$.unsubscribe()
  }
}
