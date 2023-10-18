import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, retry, switchMap, throwError} from 'rxjs';
import {AuthService} from "src/app/modules/auth/services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) return this.handleCatchError(request, next)
      }
      return throwError(() => err)
    }))
  }

  private handleCatchError( req: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap((res) => {
        this.authService.setUserInfo(res)
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `${res.accessToken}`)
        })
        return next.handle(modifiedReq)
      }),
      catchError(err => {
        localStorage.clear()
        this.router.navigate(['/login'])
        return throwError(() => err)
      })
    )
  }
}
