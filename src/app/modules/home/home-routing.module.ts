import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "src/app/modules/home/components/home/home.component";
import {isAuthUserGuard} from "src/app/modules/home/guards/is-auth-user.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [isAuthUserGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
