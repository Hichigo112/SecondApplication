import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'messenger',
    loadChildren: () => import('../modules/messenger/messenger.module').then(m => m.MessengerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
