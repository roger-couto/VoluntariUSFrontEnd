import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  public formRegistro!: FormGroup;
  public mensagem: string | null = null;
  public erro: string | null = null;

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public getControl(name: string): AbstractControl | null {
    return this.formRegistro.get(name);
  }

  public onSubmit() {
    this.mensagem = null;
    this.erro = null;

    if (this.formRegistro.invalid) {
      this.erro = "Por favor, preencha todos os campos obrigatórios corretamente.";
      return;
    }

    this.usuarioService.registrarUsuario(this.formRegistro.value).subscribe({
      next: (res) => {
        this.mensagem = "Cadastro realizado com sucesso! Faça seu login.";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.erro = err.error?.message || err.message || "Erro ao registrar usuário. Tente outro e-mail.";
      }
    });
  }
}
