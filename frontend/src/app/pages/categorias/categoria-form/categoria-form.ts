import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria';

@Component({
  selector: 'app-categoria-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css'
})
export class CategoriaForm {

  @Output() categoriaSalva = new EventEmitter<void>();

  categoria: Categoria = {
    nome: '',
    descricao: ''
  };

  mensagemErro = '';

  constructor(private categoriaService: CategoriaService) {}

  salvar(): void {
    if (!this.categoria.nome.trim()) {
      this.mensagemErro = 'O nome da categoria é obrigatório.';
      return;
    }

    this.categoriaService.salvar(this.categoria).subscribe({
      next: () => {
        this.categoria = {
          nome: '',
          descricao: ''
        };

        this.mensagemErro = '';
        this.categoriaSalva.emit();
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar categoria. Verifique se o nome já existe.';
      }
    });
  }
}
