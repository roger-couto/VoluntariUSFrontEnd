// Caminho: src/app/app.spec.ts (Corrigido)

import { TestBed } from '@angular/core/testing';
// CORREÇÃO: Altere 'App' para 'AppComponent'
import { AppComponent } from './app';

describe('AppComponent', () => { // CORREÇÃO: Altere 'App' para 'AppComponent'
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // CORREÇÃO: Altere 'App' para 'AppComponent'
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    // CORREÇÃO: Altere 'App' para 'AppComponent'
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    // CORREÇÃO: Altere 'App' para 'AppComponent'
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // O seu título pode estar incorreto, verifique o seu app.html!
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, voluntarius-frontend');
  });
});
