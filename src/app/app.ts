// src/app/app.ts
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth';
import { CommonModule } from '@angular/common'; // 👈 CORREÇÃO: Importa o CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  // 💡 Adicionado CommonModule para permitir *ngIf e outras diretivas no template
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  public authService = inject(AuthService);
  protected readonly title = signal('VoluntariUS');

  logout() {
    this.authService.logout();
  }
}
