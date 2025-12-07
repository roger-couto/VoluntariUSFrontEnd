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
      import('./components/eventos/lista-eventos/evento')
        .then(m => m.ListaEventosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'minhas-inscricoes',
    loadComponent: () =>
      import('./components/minhas-inscricoes/minhas-inscricoes.component').then(m => m.MinhasInscricoesComponent),
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
