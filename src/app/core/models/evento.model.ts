export interface UsuarioInscrito {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
}

export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  maxVoluntarios: number;
  organizadorId: number;
  organizadorNome: string;
  status: 'Aberto' | 'Fechado' | 'Concluído' | string;
  createdAt: string;
}

export interface NovoEvento {
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  maxVoluntarios: number;
}

export interface Inscricao {
  id: number;
  usuario: UsuarioInscrito;
  evento: Evento;
  dataInscricao: string;
  status: string;
  observacoes: string | null;
}
