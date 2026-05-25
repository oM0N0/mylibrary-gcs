import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria';
import { CategoriaForm } from '../categoria-form/categoria-form';

@Component({
  selector: 'app-categoria-list',
  imports: [CommonModule, CategoriaForm],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css'
})
export class CategoriaList implements OnInit {

  categorias: Categoria[] = [];
  mensagem = '';

  constructor(
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (dados) => {
        this.categorias = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar categorias.';
        this.cdr.detectChanges();
      }
    });
  }

  excluir(id?: number): void {
    if (!id) {
      return;
    }

    const confirmar = confirm('Deseja realmente excluir esta categoria?');

    if (!confirmar) {
      return;
    }

    this.categoriaService.excluir(id).subscribe({
      next: () => {
        this.mensagem = 'Categoria excluída com sucesso.';
        this.carregarCategorias();
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao excluir categoria.';
        this.cdr.detectChanges();
      }
    });
  }

  aoSalvarCategoria(): void {
    this.mensagem = 'Categoria cadastrada com sucesso.';
    this.carregarCategorias();
    this.cdr.detectChanges();
  }
}
