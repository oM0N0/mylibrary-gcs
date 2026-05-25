import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../../models/livro';
import { Emprestimo } from '../../../models/emprestimo';
import { LivroService } from '../../../services/livro';
import { EmprestimoService } from '../../../services/emprestimo';

@Component({
  selector: 'app-emprestimo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './emprestimo-form.html',
  styleUrl: './emprestimo-form.css'
})
export class EmprestimoForm implements OnInit {

  @Output() emprestimoSalvo = new EventEmitter<void>();

  livrosDisponiveis: Livro[] = [];
  mensagemErro = '';

  emprestimo: Emprestimo = {
    livro: {
      id: undefined,
      titulo: '',
      autor: '',
      isbn: '',
      ano: new Date().getFullYear(),
      categoria: {
        id: undefined,
        nome: '',
        descricao: ''
      }
    },
    nomePessoa: '',
    telefone: '',
    dataDevolucaoPrevista: ''
  };

  constructor(
    private livroService: LivroService,
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit(): void {
    this.carregarLivrosDisponiveis();
  }

  carregarLivrosDisponiveis(): void {
    this.livroService.listar('', 'DISPONIVEL', '').subscribe({
      next: (dados) => {
        this.livrosDisponiveis = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar livros disponíveis.';
      }
    });
  }

  emprestar(): void {
    if (!this.emprestimo.livro.id || !this.emprestimo.nomePessoa.trim() || !this.emprestimo.dataDevolucaoPrevista) {
      this.mensagemErro = 'Livro, nome da pessoa e data prevista são obrigatórios.';
      return;
    }

    this.emprestimoService.emprestar(this.emprestimo).subscribe({
      next: () => {
        this.emprestimo = {
          livro: {
            id: undefined,
            titulo: '',
            autor: '',
            isbn: '',
            ano: new Date().getFullYear(),
            categoria: {
              id: undefined,
              nome: '',
              descricao: ''
            }
          },
          nomePessoa: '',
          telefone: '',
          dataDevolucaoPrevista: ''
        };

        this.mensagemErro = '';
        this.carregarLivrosDisponiveis();
        this.emprestimoSalvo.emit();
      },
      error: () => {
        this.mensagemErro = 'Erro ao registrar empréstimo. Verifique se o livro está disponível.';
      }
    });
  }
}
