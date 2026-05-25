package com.mylibrary.service;

import com.mylibrary.dto.DashboardDTO;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.repository.EmprestimoRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final LivroRepository livroRepository;
    private final EmprestimoRepository emprestimoRepository;

    public DashboardService(LivroRepository livroRepository, EmprestimoRepository emprestimoRepository) {
        this.livroRepository = livroRepository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public DashboardDTO obterResumo() {
        long totalLivros = livroRepository.count();
        long livrosDisponiveis = livroRepository.countByStatus(StatusLivro.DISPONIVEL);
        long livrosEmprestados = livroRepository.countByStatus(StatusLivro.EMPRESTADO);
        long emprestimosAtivos = emprestimoRepository.findByDataDevolucaoEfetivaIsNull().size();

        var ultimosEmprestimos = emprestimoRepository.findAllByOrderByDataEmprestimoDesc(
                PageRequest.of(0, 5)
        );

        return new DashboardDTO(
                totalLivros,
                livrosDisponiveis,
                livrosEmprestados,
                emprestimosAtivos,
                ultimosEmprestimos
        );
    }
}