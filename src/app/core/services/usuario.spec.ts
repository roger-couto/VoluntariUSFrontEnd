// src/app/core/services/usuario.spec.ts (Versão Corrigida)

import { TestBed } from '@angular/core/testing';

// 💡 CORRIGIDO: Importar o nome EXPORTADO do Service
import { UsuarioService } from './usuario';

describe('UsuarioService', () => { // 💡 CORRIGIDO: Descrever o Service correto
  let service: UsuarioService; // 💡 CORRIGIDO: Usar o tipo correto

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // 💡 CORRIGIDO: Injetar a classe Service correta
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    // 💡 Teste Unitário para verificar se a injeção foi bem-sucedida.
    expect(service).toBeTruthy();
  });
});
