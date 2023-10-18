import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAuthUserGuard } from './is-auth-user.guard';

describe('isAuthUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAuthUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
