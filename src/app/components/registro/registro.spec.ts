// Caminho: src/app/components/registro/registro.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit { // <-- CORREÇÃO: A classe PRECISA ser exportada

  // Exemplo de injeção de dependência e FormBuilder
  // constructor(private fb: FormBuilder, private authService: AuthService) { }
  constructor() { }

  ngOnInit(): void {
    // Inicialização de formulários ou dados
  }
}
