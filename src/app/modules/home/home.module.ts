import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import {HomeRoutingModule} from "src/app/modules/home/home-routing.module";
import {FormsModule} from "@angular/forms";
import { AddUsersDirective } from './directives/add-users.directive';



@NgModule({
  declarations: [
    HomeComponent,
    AddUsersDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
