// src/app/core/services/auth.spec.ts
import { TestBed } from '@angular/core/testing';

// 💡 CORRIGIDO: Importa a classe correta, que é 'AuthService'
import { AuthService } from './auth';

describe('AuthService', () => { // 💡 CORRIGIDO: Nome da descrição do teste
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // 💡 CORRIGIDO: Injeta a classe correta
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
