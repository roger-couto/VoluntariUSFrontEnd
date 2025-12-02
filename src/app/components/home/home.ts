import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento.service';
import { catchError, of, finalize } from 'rxjs';

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

  usuarioLogado = this.authService.getUser();

  eventos: Evento[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.carregarEventos();
  }

  carregarEventos(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.eventoService.listarTodos()
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar eventos:', error);
          this.errorMessage = 'Falha ao carregar eventos do servidor.';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.eventos = data;
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  adicionarPresenca(eventoId: number, titulo: string): void {
    if (confirm(`Deseja confirmar sua presença no evento: ${titulo}?`)) {
      this.eventoService.adicionarPresenca(eventoId)
        .subscribe({
          next: () => {
            alert('✅ Presença adicionada com sucesso! Veja em Minhas Inscrições.');
          },
          error: (err) => {
            console.error('Erro ao inscrever:', err);
            const errorMessage = err.error?.message || err.error || 'Não foi possível se inscrever.';
            alert(`❌ Falha na inscrição: ${errorMessage}`);
          }
        });
    }
  }
}
