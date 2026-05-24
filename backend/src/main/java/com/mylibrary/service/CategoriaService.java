package com.mylibrary.service;

import com.mylibrary.entity.Categoria;
import com.mylibrary.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<Categoria> listarTodas() {
        return repository.findAll();
    }

    public Categoria salvar(Categoria categoria) {

        if (repository.existsByNome(categoria.getNome())) {
            throw new RuntimeException("Já existe uma categoria com esse nome.");
        }

        return repository.save(categoria);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}