import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Inscricao } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-minhas-inscricoes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './minhas-inscricoes.component.html',
  styleUrl: './minhas-inscricoes.component.css'
})
export class MinhasInscricoesComponent implements OnInit {

  private readonly eventoService = inject(EventoService);

  inscricoes: Inscricao[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.carregarInscricoes();
  }

  carregarInscricoes(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventoService.minhasInscricoes()
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar inscrições:', error);
          this.errorMessage = 'Falha ao carregar suas inscrições. Tente novamente mais tarde.';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe({
        next: (data: Inscricao[]) => {
          this.inscricoes = data;
          this.isLoading = false;

          if (this.inscricoes.length === 0) {
            this.inscricoes = this.simularInscricoes();
          }
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  private simularInscricoes(): Inscricao[] {
    const dataAtual = new Date().toISOString();
    return [
      {
        id: 101, eventoId: 1, usuarioId: 1, dataInscricao: dataAtual,
        evento: {
          id: 1, titulo: 'Limpeza de Praia', descricao: 'Mutirão na Praia do Forte.',
          dataEvento: '2025-12-20T10:00:00Z', local: 'Praia do Forte', organizadorId: 101, organizadorNome: 'ONG Oceano',
          maxVoluntarios: 50, status: 'Aberto', createdAt: '2025-11-01T08:00:00Z', usuarioId: 1
        }
      }
    ];
  }

  cancelarInscricao(inscricaoId: number): void {
    if (confirm(`Deseja cancelar a inscrição ID ${inscricaoId}?`)) {
      alert('Cancelamento simulado com sucesso. Recarregue a página.');
    }
  }
}
