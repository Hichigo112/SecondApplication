import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('refresh')) {
      return next.handle(request)
    }
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
    })
    return next.handle(modifiedReq);
  }
}
