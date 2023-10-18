import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthRoutingModule} from "src/app/modules/auth/auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    AuthRoutingModule,
    RouterLink,
    RouterLinkActive, ReactiveFormsModule
  ]
})
export class AuthModule { }
