package com.mylibrary.repository;

import com.mylibrary.entity.Emprestimo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();

    List<Emprestimo> findByLivroId(Long livroId);

    List<Emprestimo> findByDataDevolucaoPrevistaBeforeAndDataDevolucaoEfetivaIsNull(LocalDate data);

    List<Emprestimo> findAllByOrderByDataEmprestimoDesc(Pageable pageable);
}