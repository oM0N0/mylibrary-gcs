import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Livro } from '../../../models/livro';
import { Categoria } from '../../../models/categoria';
import { LivroService } from '../../../services/livro';
import { CategoriaService } from '../../../services/categoria';

@Component({
  selector: 'app-livro-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css'
})
export class LivroForm implements OnInit {

  @Output() livroSalvo = new EventEmitter<void>();

  categorias: Categoria[] = [];
  mensagemErro = '';

  livro: Livro = {
    titulo: '',
    autor: '',
    isbn: '',
    ano: new Date().getFullYear(),
    categoria: {
      id: undefined,
      nome: '',
      descricao: ''
    }
  };

  constructor(
    private livroService: LivroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias = dados;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar categorias.';
      }
    });
  }

  salvar(): void {
    if (!this.livro.titulo.trim() || !this.livro.autor.trim() || !this.livro.categoria.id) {
      this.mensagemErro = 'Título, autor e categoria são obrigatórios.';
      return;
    }

    this.livroService.salvar(this.livro).subscribe({
      next: () => {
        this.livro = {
          titulo: '',
          autor: '',
          isbn: '',
          ano: new Date().getFullYear(),
          categoria: {
            id: undefined,
            nome: '',
            descricao: ''
          }
        };

        this.mensagemErro = '';
        this.livroSalvo.emit();
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar livro.';
      }
    });
  }
}
