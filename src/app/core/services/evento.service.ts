// src/app/core/services/evento.service.ts (COMPLETO E CORRIGIDO)

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
// 💡 Importando Inscricao do seu Model corrigido
import { Evento, Inscricao } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  /**
   * Busca a lista de todos os eventos disponíveis.
   */
  listarTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.API_URL}/eventos`);
  }

  /**
   * Adiciona a presença/inscrição do usuário no evento.
   */
  adicionarPresenca(eventoId: number): Observable<any> {
    const url = `${this.API_URL}/eventos/${eventoId}/inscricao`;
    return this.http.post(url, {});
  }

  // 💡 MÉTODO FALTANTE (TS2339 CORRIGIDO)
  /**
   * Busca a lista de inscrições do usuário logado.
   * Endpoint: GET /usuarios/minhas-inscricoes
   */
  minhasInscricoes(): Observable<Inscricao[]> {
    const url = `${this.API_URL}/usuarios/minhas-inscricoes`;
    return this.http.get<Inscricao[]>(url);
  }
}
