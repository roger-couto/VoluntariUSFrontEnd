import { Component, OnInit, ViewChild, ElementRef, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento.service';
import { catchError, of, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {

  @ViewChild('carousel') carousel!: ElementRef;

  private authService = inject(AuthService);
  private router = inject(Router);
  private eventoService = inject(EventoService);
  private cdr = inject(ChangeDetectorRef);

  usuarioLogado: any = null;

  eventos: Evento[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (token) {
      this.usuarioLogado = this.authService.getUser() || { nome: 'Usuário Ativo' };
      this.carregarEventos();
    } else {
      alert('Sessão expirada. Faça login novamente.');
      this.logout();
    }
  }

  carregarEventos(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventoService.listarTodos()
      .pipe(
        tap(data => console.log('TAP: Dados brutos recebidos:', data)),

        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao carregar eventos:', error);

          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Sessão expirada ou acesso negado.';
            this.logout();
          } else {
            this.errorMessage = 'Erro ao carregar eventos. Tente novamente mais tarde.';
          }

          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data: Evento[]) => {
          console.log('SUBSCRIBE EXECUTADO: Eventos carregados:', data.length);
          this.eventos = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Falha crítica no Subscribe:', err);
          this.errorMessage = 'Falha crítica ao carregar dados.';
        }
      });
  }

  resolverStatus(status: string): string {
    const s = status ? status.toUpperCase() : '';
    switch (s) {
      case 'ABERTO':
      case 'ATIVO':
        return 'Aberto';
      case 'FECHADO':
        return 'Fechado';
      case 'CONCLUIDO':
        return 'Concluído';
      default:
        return status;
    }
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  adicionarPresenca(eventoId: number, titulo: string): void {
    if (confirm(`Deseja confirmar presença em: ${titulo}?`)) {
      this.eventoService.adicionarPresenca(eventoId).subscribe({

        next: () => {
          alert('Presença confirmada!');
          this.carregarEventos();
        },

        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            alert('Presença confirmada! (Você já estava inscrito.)');
            this.carregarEventos();
          } else if (err.status === 401 || err.status === 403) {
            const errorMessage = 'Sessão expirada. Faça login novamente.';
            alert(`Falha na inscrição: ${errorMessage}`);
            this.logout();
          } else {
            const errorMessage = err.error?.message || err.error?.title || 'Falha ao confirmar presença.';
            alert(`Falha na inscrição: ${errorMessage}`);
          }
        }
      });
    }
  }
}
