// src/app/core/guards/auth-guard-guard.spec.ts

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

// 💡 CORRIGIDO: O nome exportado é 'AuthGuard', não 'authGuardGuard'
import { AuthGuard } from './auth-guard-guard';

describe('AuthGuard', () => { // Nomeando o describe com o nome correto
                              // Ajuste o nome da função a ser executada para refletir o export correto
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthGuard(...guardParameters)); // 👈 Usa 'AuthGuard'

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
