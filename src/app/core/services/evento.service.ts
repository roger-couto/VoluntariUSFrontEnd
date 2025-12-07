import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Evento, Inscricao } from '../models/evento.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  listarTodos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.API_URL}/eventos`).pipe(
      map(data => data ?? [])
    );
  }

  adicionarPresenca(eventoId: number): Observable<any> {
    const url = `${this.API_URL}/eventos/${eventoId}/inscricao`;
    return this.http.post(url, {});
  }

  minhasInscricoes(): Observable<Inscricao[]> {
    const url = `${this.API_URL}/usuarios/minhas-inscricoes`;
    return this.http.get<Inscricao[]>(url).pipe(
      map(data => data ?? [])
    );
  }

  // MÉTODO CORRIGIDO/GARANTIDO (Resolve TS2339)
  cancelarInscricao(eventoId: number): Observable<any> {
    const url = `${this.API_URL}/eventos/${eventoId}/inscricao`;
    return this.http.delete(url);
  }
}
