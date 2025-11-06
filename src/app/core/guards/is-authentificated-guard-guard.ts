import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@core/services/auth';

export const isAuthentificatedGuardGuard: CanActivateFn = (route, state) => {
  const _authService = inject(Auth);
  const _router = inject(Router);

  const isLoggedIn = _authService.isLoggedIn();
  if (!isLoggedIn) {
    _router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
