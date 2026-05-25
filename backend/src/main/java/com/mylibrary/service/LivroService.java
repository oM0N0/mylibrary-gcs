package com.mylibrary.service;

import com.mylibrary.entity.Categoria;
import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.repository.CategoriaRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;

    public LivroService(LivroRepository livroRepository, CategoriaRepository categoriaRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Livro> listar(Long categoriaId, StatusLivro status, String busca) {
        if (busca != null && !busca.isBlank()) {
            return livroRepository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(busca, busca);
        }

        if (categoriaId != null) {
            return livroRepository.findByCategoriaId(categoriaId);
        }

        if (status != null) {
            return livroRepository.findByStatus(status);
        }

        return livroRepository.findAll();
    }

    public Livro buscarPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado."));
    }

    public Livro salvar(Livro livro) {
        Categoria categoria = categoriaRepository.findById(livro.getCategoria().getId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada."));

        livro.setCategoria(categoria);
        livro.setStatus(StatusLivro.DISPONIVEL);

        return livroRepository.save(livro);
    }

    public void excluir(Long id) {
        Livro livro = livroRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro não encontrado."));

        if (livro.getStatus() != StatusLivro.DISPONIVEL) {
            throw new RuntimeException("Não é possível excluir livro que não esteja disponível.");
        }

        livroRepository.delete(livro);
    }
}