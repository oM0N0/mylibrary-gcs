import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Emprestimo } from '../../models/emprestimo';
import { EmprestimoService } from '../../services/emprestimo';

@Component({
  selector: 'app-atrasados',
  imports: [CommonModule],
  templateUrl: './atrasados.html',
  styleUrl: './atrasados.css'
})
export class Atrasados implements OnInit {

  emprestimos: Emprestimo[] = [];
  mensagem = '';

  constructor(
    private emprestimoService: EmprestimoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarAtrasados();
  }

  carregarAtrasados(): void {
    this.emprestimoService.listarAtrasados().subscribe({
      next: (dados) => {
        this.emprestimos = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar relatório de atrasados.';
        this.cdr.detectChanges();
      }
    });
  }

  calcularDiasAtraso(dataPrevista: string): number {
    const hoje = new Date();
    const prevista = new Date(dataPrevista);

    hoje.setHours(0, 0, 0, 0);
    prevista.setHours(0, 0, 0, 0);

    const diferenca = hoje.getTime() - prevista.getTime();

    return Math.max(Math.floor(diferenca / (1000 * 60 * 60 * 24)), 0);
  }
}
