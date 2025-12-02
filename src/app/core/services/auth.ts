// src/app/core/services/auth.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Credenciais, TokenResponse, UsuarioLogado } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly TOKEN_KEY = 'voluntarius_token';
  private readonly USER_KEY = 'voluntarius_user';
  private readonly API_URL = 'http://localhost:8081';

  // 1. MÉTODO DE LOGIN
  login(credenciais: Credenciais): Observable<TokenResponse> {
    // 💡 CORRIGIDO: Altera o endpoint de /login para /auth
    return this.http.post<TokenResponse>(`${this.API_URL}/auth`, credenciais);
  }

  // 2. SALVAR O TOKEN
  setToken(dadosToken: TokenResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, dadosToken.token);
      const user = this.userFromToken(dadosToken.token);
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }
    }
  }

  // 3. RECUPERAR O TOKEN
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // 💡 MÉTODOS REIMPLANTADOS A PARTIR DA CORREÇÃO SSR

  // 4. RECUPERAR O USUÁRIO LOGADO (Chamado pelo HomeComponent)
  getUser(): UsuarioLogado | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as UsuarioLogado; } catch { return null; }
  }

  // 5. VERIFICAR SE ESTÁ LOGADO
  isLogged(): boolean {
    return !!this.getToken();
  }

  // 6. LOGOUT
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.router.navigate(['/login']);
  }

  // 7. DECODIFICAR O JWT (Privado)
  private userFromToken(token: string): UsuarioLogado | null {
    if (this.isBrowser) {
      try {
        const payload = token.split('.')[1];
        if (!payload) return null;
        const decoded = JSON.parse(atob(payload));

        return {
          id: decoded.id,
          nome: decoded.nome,
          email: decoded.sub,
          roles: decoded.roles
        } as UsuarioLogado;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}
