package com.mylibrary.dto;

import com.mylibrary.entity.Emprestimo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DashboardDTO {

    private long totalLivros;
    private long livrosDisponiveis;
    private long livrosEmprestados;
    private long emprestimosAtivos;
    private List<Emprestimo> ultimosEmprestimos;

    public DashboardDTO(
            long totalLivros,
            long livrosDisponiveis,
            long livrosEmprestados,
            long emprestimosAtivos,
            List<Emprestimo> ultimosEmprestimos
    ) {
        this.totalLivros = totalLivros;
        this.livrosDisponiveis = livrosDisponiveis;
        this.livrosEmprestados = livrosEmprestados;
        this.emprestimosAtivos = emprestimosAtivos;
        this.ultimosEmprestimos = ultimosEmprestimos;
    }
}