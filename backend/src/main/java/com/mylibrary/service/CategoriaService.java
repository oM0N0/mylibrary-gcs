package com.mylibrary.service;

import com.mylibrary.entity.Categoria;
import com.mylibrary.repository.CategoriaRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final LivroRepository livroRepository;

    public CategoriaService(CategoriaRepository categoriaRepository, LivroRepository livroRepository) {
        this.categoriaRepository = categoriaRepository;
        this.livroRepository = livroRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria salvar(Categoria categoria) {

        if (categoriaRepository.existsByNome(categoria.getNome())) {
            throw new RuntimeException("Já existe uma categoria com esse nome.");
        }

        return categoriaRepository.save(categoria);
    }

    public void excluir(Long id) {
        if (livroRepository.existsByCategoriaId(id)) {
            throw new RuntimeException("Não é possível excluir categoria com livros vinculados.");
        }

        categoriaRepository.deleteById(id);
    }
}