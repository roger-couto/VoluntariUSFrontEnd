// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
// 💡 CORRIGIDO: O nome da classe importada é AppComponent.
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
// Removida a lógica temporária de logout

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
