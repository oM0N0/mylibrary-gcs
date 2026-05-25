import { Emprestimo } from './emprestimo';

export interface Dashboard {
  totalLivros: number;
  livrosDisponiveis: number;
  livrosEmprestados: number;
  emprestimosAtivos: number;
  ultimosEmprestimos: Emprestimo[];
}
