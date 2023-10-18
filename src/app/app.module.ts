import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorizationInterceptor} from "src/app/interceptors/authorization.interceptor";
import {RefreshInterceptor} from "src/app/interceptors/refresh.interceptor";
import {SocketIoModule, SocketIoConfig} from "ngx-socket-io";
import {API_INSTANCE} from "src/app/constants/api";

const config: SocketIoConfig = {
  url: API_INSTANCE
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}, {provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
