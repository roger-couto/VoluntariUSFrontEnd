// src/app/core/models/evento.model.ts (COMPLETO E CORRIGIDO)

// 💡 Definição do Evento completa para corrigir o erro TS2553
export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  maxVoluntarios: number;
  usuarioId: number;
  // 💡 PROPRIEDADES FALTANTES que causam o erro de tipagem no home.ts
  organizadorId: number;
  organizadorNome: string;
  status: 'Aberto' | 'Fechado' | 'Concluído';
  createdAt: string;
}

export interface NovoEvento {
  titulo: string;
  descricao: string;
  dataEvento: string;
  local: string;
  maxVoluntarios: number;
}

// 💡 Modelo necessário para receber dados do Backend na tela "Minhas Inscrições"
export interface Inscricao {
  id: number;
  eventoId: number;
  usuarioId: number;
  dataInscricao: string;
  evento: Evento; // Detalhes do evento inscrito
}
