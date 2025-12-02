// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { RegistroComponent } from './components/registro/registro';
import { AuthGuard } from './core/guards/auth-guard-guard';
import { PublicGuard } from './core/guards/public-guard-guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [PublicGuard]
  },

  {
    path: 'registro',
    component: RegistroComponent
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'eventos',
    loadComponent: () =>
      import('./components/eventos/lista-eventos/evento') // Caminho para o arquivo
        .then(m => m.ListaEventosComponent), // 👈 Funciona se ListaEventosComponent estiver EXPORTADO
    canActivate: [AuthGuard]
  },
  {
    // 💡 Adicionando a rota para Minhas Inscrições (próxima etapa)
    path: 'minhas-inscricoes',
    loadComponent: () =>
      import('./components/minhas-inscricoes/minhas-inscricoes.component').then(m => m.MinhasInscricoesComponent),
    canActivate: [AuthGuard]
  },

  // Redirecionamento padrão
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
