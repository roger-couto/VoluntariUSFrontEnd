// src/app/core/models/usuario.model.ts
// Mapeia o UsuarioCadastroDTO do seu Java
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}
