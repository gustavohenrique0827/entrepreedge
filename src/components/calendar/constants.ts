
import { Category } from './types';

export const EVENT_CATEGORIES: Category[] = [
  { id: 'internal', name: 'Interno', color: '#8B5CF6' },
  { id: 'client', name: 'Cliente', color: '#10B981' },
  { id: 'personal', name: 'Pessoal', color: '#3B82F6' },
  { id: 'holiday', name: 'Feriado', color: '#F97316' },
  { id: 'deadline', name: 'Prazo', color: '#EF4444' },
];

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Reunião de Planejamento',
    description: 'Planejamento trimestral com a equipe de vendas',
    startTime: '2025-04-16T09:00:00',
    endTime: '2025-04-16T11:00:00',
    location: 'Sala de Conferências A',
    category: 'internal',
    participants: ['João Silva', 'Maria Santos', 'Carlos Oliveira'],
    reminder: '30min'
  },
  {
    id: 2,
    title: 'Apresentação para Cliente',
    description: 'Apresentação da nova proposta para XYZ Corp',
    startTime: '2025-04-16T14:00:00',
    endTime: '2025-04-16T15:30:00',
    location: 'Escritório do Cliente',
    category: 'client',
    participants: ['Ana Costa', 'Pedro Souza'],
    reminder: '1h'
  },
  {
    id: 3,
    title: 'Prazo: Entrega do Relatório',
    description: 'Entrega do relatório trimestral financeiro',
    startTime: '2025-04-18T17:00:00',
    endTime: '2025-04-18T17:00:00',
    location: '',
    category: 'deadline',
    participants: [],
    reminder: '1d'
  },
  {
    id: 4,
    title: 'Treinamento de Equipe',
    description: 'Treinamento sobre as novas ferramentas',
    startTime: '2025-04-17T13:00:00',
    endTime: '2025-04-17T16:00:00',
    location: 'Sala de Treinamento',
    category: 'internal',
    participants: ['Toda a equipe'],
    reminder: '1h'
  },
  {
    id: 5,
    title: 'Almoço com Parceiros',
    description: 'Almoço para discutir nova parceria',
    startTime: '2025-04-19T12:00:00',
    endTime: '2025-04-19T13:30:00',
    location: 'Restaurante Central',
    category: 'client',
    participants: ['Marcos Vinicius', 'Juliana Alves'],
    reminder: '1h'
  }
];
