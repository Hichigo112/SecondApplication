import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  takeUntil,
  throwError
} from "rxjs";
import {UserService} from "src/app/modules/home/services/user.service";
import {User} from "src/app/modules/home/types/userTypes";
import {RoomService} from "src/app/modules/room/services/room.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  userName = ''
  userSearch$: Subject<string> = new Subject<string>()
  destroy$: Subject<boolean> = new Subject<boolean>()
  foundUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  selectedUsersIds = new Set<string>()

  constructor(private userService: UserService, private roomService: RoomService,  private router: Router) {
  }

  ngOnInit(): void {
    this.userSearch$.pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return throwError(() => err)
      }),
      debounceTime(700),
      distinctUntilChanged(),
    ).subscribe(userName => this.userService.findUser(userName).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => this.foundUsers$.next(res)))
  }

  updateUsersIds(id: string) {
    if (this.selectedUsersIds.has(id)) {
      this.selectedUsersIds.delete(id)
    } else {
      this.selectedUsersIds.add(id)
    }
  }

  callUsers() {
    const arraySelectedIds = Array.from(this.selectedUsersIds)
    this.roomService.createRoom(arraySelectedIds).subscribe(res => this.router.navigate([`/room/${res._id}`]))
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
