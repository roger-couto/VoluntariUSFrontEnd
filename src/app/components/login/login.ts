import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { Credenciais } from '../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credenciais: Credenciais = { email: '', senha: '' };
  mensagemErro: string | null = null;

  onSubmit() {
    this.mensagemErro = null;
    this.authService.login(this.credenciais).subscribe({
      next: (response) => {
        this.authService.setToken(response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no Login:', err);
        this.mensagemErro = err.error.message || err.error || 'Credenciais inválidas. Tente novamente.';
      }
    });
  }
}
