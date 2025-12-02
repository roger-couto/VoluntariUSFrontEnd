// src/app/core/guards/public-guard-guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const PublicGuard: CanActivateFn = (route, state) => { // 👈 CORRIGIDO: A função deve ser exportada
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
