import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const dontAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (localStorage.getItem('accessToken')) {
    router.navigate(['/home'])
    return false
  }
  return true
};