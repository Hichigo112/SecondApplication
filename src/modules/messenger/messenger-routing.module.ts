import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MessengeComponent} from "src/modules/messenger/components/messenge/messenge.component";



const routes: Routes = [
    {
        path: '',
        component: MessengeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessengerRoutingModule { }
