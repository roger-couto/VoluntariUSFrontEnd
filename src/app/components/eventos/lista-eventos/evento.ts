import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../core/models/evento.model';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Lista de Eventos</h2>
    <p>Componente carregado via Lazy Loading.</p>
    `,
})
export class ListaEventosComponent implements OnInit {

  eventos: Evento[] = [];

  ngOnInit(): void {
  }
}
