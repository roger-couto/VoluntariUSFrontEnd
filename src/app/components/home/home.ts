import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento.service';
import { catchError, of, finalize } from 'rxjs';
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

  // ✅ NÃO pegar usuário fora do ciclo de vida
  usuarioLogado: any = null;

  eventos: Evento[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  // -----------------------------
  // CICLO DE VIDA CORRETO
  // -----------------------------
  ngOnInit(): void {

    // ✅ Pega usuário no momento certo
    this.usuarioLogado = this.authService.getUser();

    console.log('Usuário logado:', this.usuarioLogado);

    // ✅ Se não houver usuário → força logout
    if (!this.usuarioLogado) {
      alert('Sessão expirada. Faça login novamente.');
      this.logout();
      return;
    }

    // ✅ Carrega normalmente
    this.carregarEventos();
  }

  // -----------------------------
  // CARREGAR EVENTOS
  // -----------------------------
  carregarEventos(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventoService.listarTodos()
      .pipe(
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
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (data) => {
          console.log('Eventos recebidos:', data.length);
          this.eventos = data;
        },
        error: (err) => {
          console.error('Erro inesperado:', err);
        }
      });
  }

  // -----------------------------
  // STATUS
  // -----------------------------
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

  // -----------------------------
  // CARROSSEL (SE EXISTIR)
  // -----------------------------
  scrollAmount: number = 0;
  private scrollStep: number = 330;

  nextSlide(): void {
    if (this.carousel) {
      this.scrollAmount += this.scrollStep;
      this.carousel.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
    }
  }

  prevSlide(): void {
    if (this.carousel) {
      this.scrollAmount -= this.scrollStep;
      if (this.scrollAmount < 0) this.scrollAmount = 0;
      this.carousel.nativeElement.scrollTo({ left: this.scrollAmount, behavior: 'smooth' });
    }
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // -----------------------------
  // INSCRIÇÃO NO EVENTO
  // -----------------------------
  adicionarPresenca(eventoId: number, titulo: string): void {
    if (confirm(`Deseja confirmar presença em: ${titulo}?`)) {

      this.eventoService.adicionarPresenca(eventoId).subscribe({

        next: () => {
          alert('✅ Presença confirmada!');
          this.carregarEventos();
        },

        error: (err) => {
          console.error('Erro ao se inscrever:', err);

          const errorMessage =
            err.error?.message ||
            err.error ||
            'Falha ao confirmar presença.';

          alert(`❌ ${errorMessage}`);
        }

      });
    }
  }
}
