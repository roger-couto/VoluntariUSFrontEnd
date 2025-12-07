import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { NovoUsuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { // 👈 CORRIGIDO: Adicionado 'export'
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  /**
   * Envia os dados de cadastro para o endpoint de registro do backend.
   * Endpoint: POST /usuarios/registrar
   */
  registrarUsuario(dados: NovoUsuario): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/usuarios/registrar`, dados);
  }
}
