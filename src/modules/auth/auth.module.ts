import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterOutlet} from "@angular/router";
import {AuthRoutingModule} from "src/modules/auth/auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



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
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
