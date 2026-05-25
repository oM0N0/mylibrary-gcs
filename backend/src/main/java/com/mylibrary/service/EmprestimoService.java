package com.mylibrary.service;

import com.mylibrary.entity.Emprestimo;
import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.repository.EmprestimoRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();
    }

    public List<Emprestimo> listarAtivos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull();
    }

    public List<Emprestimo> listarAtrasados() {
        return emprestimoRepository.findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate.now());
    }

    public List<Emprestimo> historicoPorLivro(Long livroId) {
        return emprestimoRepository.findByLivroId(livroId);
    }

    public Emprestimo emprestar(Emprestimo emprestimo) {
        Livro livro = livroRepository.findById(emprestimo.getLivro().getId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado."));

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new RuntimeException("Este livro já está emprestado.");
        }

        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);

        emprestimo.setLivro(livro);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoEfetiva(null);

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolver(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado."));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new RuntimeException("Este empréstimo já foi devolvido.");
        }

        Livro livro = emprestimo.getLivro();

        if (livro.getStatus() == StatusLivro.DISPONIVEL) {
            throw new RuntimeException("Este livro já está disponível.");
        }

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());

        livro.setStatus(StatusLivro.DISPONIVEL);
        livroRepository.save(livro);

        return emprestimoRepository.save(emprestimo);
    }
}