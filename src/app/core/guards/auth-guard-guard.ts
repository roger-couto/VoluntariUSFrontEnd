// src/app/core/guards/auth-guard-guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const AuthGuard: CanActivateFn = (route, state) => { // 👈 CORRIGIDO: A função deve ser exportada
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
