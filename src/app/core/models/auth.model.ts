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
