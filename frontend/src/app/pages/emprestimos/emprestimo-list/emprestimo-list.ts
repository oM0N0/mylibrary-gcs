import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Emprestimo } from '../../../models/emprestimo';
import { EmprestimoService } from '../../../services/emprestimo';
import { EmprestimoForm } from '../emprestimo-form/emprestimo-form';

@Component({
  selector: 'app-emprestimo-list',
  imports: [CommonModule, EmprestimoForm],
  templateUrl: './emprestimo-list.html',
  styleUrl: './emprestimo-list.css'
})
export class EmprestimoList implements OnInit {

  emprestimos: Emprestimo[] = [];
  mensagem = '';

  constructor(
    private emprestimoService: EmprestimoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarEmprestimosAtivos();
  }

  carregarEmprestimosAtivos(): void {
    this.emprestimoService.listarAtivos().subscribe({
      next: (dados) => {
        this.emprestimos = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar empréstimos.';
        this.cdr.detectChanges();
      }
    });
  }

  devolver(id?: number): void {
    if (!id) {
      return;
    }

    const confirmar = confirm('Confirmar devolução deste livro?');

    if (!confirmar) {
      return;
    }

    this.emprestimoService.devolver(id).subscribe({
      next: () => {
        this.mensagem = 'Livro devolvido com sucesso.';
        this.carregarEmprestimosAtivos();
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao devolver livro.';
        this.cdr.detectChanges();
      }
    });
  }

  aoSalvarEmprestimo(): void {
    this.mensagem = 'Empréstimo registrado com sucesso.';
    this.carregarEmprestimosAtivos();
    this.cdr.detectChanges();
  }

  calcularDiasAtraso(dataPrevista: string): number {
    const hoje = new Date();
    const prevista = new Date(dataPrevista);

    hoje.setHours(0, 0, 0, 0);
    prevista.setHours(0, 0, 0, 0);

    const diferenca = hoje.getTime() - prevista.getTime();

    return Math.max(Math.floor(diferenca / (1000 * 60 * 60 * 24)), 0);
  }

  estaAtrasado(dataPrevista: string): boolean {
    return this.calcularDiasAtraso(dataPrevista) > 0;
  }
}
