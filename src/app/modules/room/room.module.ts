import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import { RoomsPageComponent } from './components/rooms-page/rooms-page.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import {RoomRoutingModule} from "src/app/modules/room/room-routing.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomItemComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RoomRoutingModule,
        FormsModule
    ]
})
export class RoomModule { }
