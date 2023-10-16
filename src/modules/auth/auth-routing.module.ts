import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "src/modules/auth/components/register/register.component";
import {LoginComponent} from "src/modules/auth/components/login/login.component";
import {NavigationComponent} from "src/modules/auth/components/navigation/navigation.component";
import {dontAuthGuard} from "src/modules/auth/guards/dont-auth.guard";


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [dontAuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
