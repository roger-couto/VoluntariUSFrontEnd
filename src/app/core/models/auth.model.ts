// src/app/core/models/auth.model.ts
// Este arquivo é o único que usa o sufixo '.model' no nome do arquivo.
export interface Credenciais {
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
  tipo: string;
}

export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
  roles: string[];
}
