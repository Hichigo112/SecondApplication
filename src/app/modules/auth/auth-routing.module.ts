import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "src/app/modules/auth/components/register/register.component";
import {LoginComponent} from "src/app/modules/auth/components/login/login.component";
import {NavigationComponent} from "src/app/modules/auth/components/navigation/navigation.component";
import {dontAuthGuard} from "src/app/modules/auth/guards/dont-auth.guard";


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
        canActivate: [dontAuthGuard],
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
