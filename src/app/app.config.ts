// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
// Importamos o provideRouter e o módulo de rotas
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 💡 CORRIGIDO: Passamos a opção withHashLocation para o provideRouter
    provideRouter(routes, withHashLocation()),

    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
