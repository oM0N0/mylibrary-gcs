import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../../models/livro';
import { Categoria } from '../../../models/categoria';
import { LivroService } from '../../../services/livro';
import { CategoriaService } from '../../../services/categoria';
import { LivroForm } from '../livro-form/livro-form';

@Component({
  selector: 'app-livro-list',
  imports: [CommonModule, FormsModule, LivroForm],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css'
})
export class LivroList implements OnInit {

  livros: Livro[] = [];
  categorias: Categoria[] = [];

  filtroCategoria = '';
  filtroStatus = '';
  filtroBusca = '';

  mensagem = '';

  constructor(
    private livroService: LivroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarLivros();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar categorias.';
      }
    });
  }

  carregarLivros(): void {
    this.livroService.listar(
      this.filtroCategoria,
      this.filtroStatus,
      this.filtroBusca
    ).subscribe({
      next: (dados) => {
        this.livros = dados;
      },
      error: () => {
        this.mensagem = 'Erro ao carregar livros.';
      }
    });
  }

  aplicarFiltros(): void {
    this.carregarLivros();
  }

  limparFiltros(): void {
    this.filtroCategoria = '';
    this.filtroStatus = '';
    this.filtroBusca = '';
    this.carregarLivros();
  }

  excluir(id?: number): void {
    if (!id) {
      return;
    }

    const confirmar = confirm('Deseja realmente excluir este livro?');

    if (!confirmar) {
      return;
    }

    this.livroService.excluir(id).subscribe({
      next: () => {
        this.mensagem = 'Livro excluído com sucesso.';
        this.carregarLivros();
      },
      error: () => {
        this.mensagem = 'Erro ao excluir livro. Verifique se ele está disponível.';
      }
    });
  }

  aoSalvarLivro(): void {
    this.mensagem = 'Livro cadastrado com sucesso.';
    this.carregarLivros();
  }
}
