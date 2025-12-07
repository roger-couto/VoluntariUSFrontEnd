import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Inscricao, UsuarioInscrito, Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento.service';
import { catchError, of, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-minhas-inscricoes',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './minhas-inscricoes.component.html',
  styleUrl: './minhas-inscricoes.component.css'
})
export class MinhasInscricoesComponent implements OnInit {

  private readonly eventoService = inject(EventoService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  inscricoes: Inscricao[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    if (!this.authService.getUser()) {
      void this.router.navigate(['/login']);
      return;
    }
    this.carregarInscricoes();
  }

  carregarInscricoes(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventoService.minhasInscricoes()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Sessão expirada. Faça login novamente.';
            this.authService.logout();
            void this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Falha ao carregar suas inscrições. Tente novamente mais tarde.';
          }
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data: Inscricao[]) => {
          this.inscricoes = data;

          if (this.inscricoes.length === 0) {
            this.inscricoes = this.simularInscricoes();
          }
          this.cdr.detectChanges();
        }
      });
  }

  private simularInscricoes(): Inscricao[] {
    const dataAtual = new Date().toISOString();
    const simulatedUser: UsuarioInscrito = { id: 1, nome: 'Usuário Simulado', email: 'sim@test.com', telefone: null };
    const simulatedEvent: Evento = { id: 1, titulo: 'Limpeza de Praia', descricao: 'Mutirão na Praia do Forte.', dataEvento: '2025-12-20T10:00:00Z', local: 'Praia do Forte', organizadorId: 101, organizadorNome: 'ONG Oceano', maxVoluntarios: 50, status: 'Aberto', createdAt: '2025-11-01T08:00:00Z'};

    return [
      {
        id: 101, usuario: simulatedUser, evento: simulatedEvent, dataInscricao: dataAtual,
        status: 'CONFIRMADA', observacoes: null
      }
    ];
  }

  cancelarInscricao(inscricaoId: number): void {
    const inscricao = this.inscricoes.find(i => i.id === inscricaoId);
    if (!inscricao) return;

    if (confirm(`Deseja cancelar a inscrição do evento: ${inscricao.evento.titulo}?`)) {
      this.eventoService.cancelarInscricao(inscricao.evento.id).subscribe({
        next: () => {
          alert('Inscrição cancelada com sucesso.');
          this.carregarInscricoes();
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error?.message || 'Falha ao cancelar a inscrição.';
          alert(errorMessage);
        }
      });
    }
  }
}
