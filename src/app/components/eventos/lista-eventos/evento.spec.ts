import { TestBed } from '@angular/core/testing';
import { ListaEventosComponent } from './evento';

describe('ListaEventosComponent', () => {
  beforeEach(async () => {
    // 💡 Configura o módulo de teste para o componente Standalone
    await TestBed.configureTestingModule({
      imports: [ListaEventosComponent]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ListaEventosComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize the events array as empty', () => {
    const fixture = TestBed.createComponent(ListaEventosComponent);
    const component = fixture.componentInstance;
    expect(component.eventos).toEqual([]);
  });
});
