import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomsPageComponent} from "src/app/modules/room/components/rooms-page/rooms-page.component";
import {RoomItemComponent} from "src/app/modules/room/components/room-item/room-item.component";

const routes: Routes = [
  {
    path: '',
    component: RoomsPageComponent,
    children: [{
      path: ':id',
      component: RoomItemComponent
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
