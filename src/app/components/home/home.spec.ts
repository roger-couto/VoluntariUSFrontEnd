import { ComponentFixture, TestBed } from '@angular/core/testing';

// CORREÇÃO: Altere o nome da classe importada de { Home } para { HomeComponent }
// Pois a sua classe é definida como 'export class HomeComponent' no arquivo home.ts.
import { HomeComponent } from './home';

describe('HomeComponent', () => { // Boa prática: renomear o describe() também
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Componentes Standalone devem ser listados aqui:
      imports: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
