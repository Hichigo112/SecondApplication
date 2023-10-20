import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const isAuthUserGuard: CanActivateFn = (): boolean => {
  const router = inject(Router)
  if (localStorage.getItem('accessToken')) return true

  router.navigate(['/login'])
  return false;
};
