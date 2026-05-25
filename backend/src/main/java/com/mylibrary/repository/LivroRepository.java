package com.mylibrary.repository;

import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    List<Livro> findByCategoriaId(Long categoriaId);

    List<Livro> findByStatus(StatusLivro status);

    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(
            String titulo,
            String autor
    );

    boolean existsByCategoriaId(Long categoriaId);

    long countByStatus(StatusLivro status);
}