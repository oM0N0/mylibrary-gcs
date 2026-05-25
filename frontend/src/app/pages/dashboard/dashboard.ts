import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard as DashboardModel } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  resumo?: DashboardModel;
  mensagem = '';

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.dashboardService.obterResumo().subscribe({
      next: (dados) => {
        this.resumo = dados;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Erro ao carregar dashboard.';
        this.cdr.detectChanges();
      }
    });
  }
}
