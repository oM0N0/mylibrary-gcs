package com.mylibrary.controller;

import com.mylibrary.entity.Emprestimo;
import com.mylibrary.service.EmprestimoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emprestimos")
@CrossOrigin("*")
public class EmprestimoController {

    private final EmprestimoService service;

    public EmprestimoController(EmprestimoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Emprestimo> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/ativos")
    public List<Emprestimo> listarAtivos() {
        return service.listarAtivos();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> listarAtrasados() {
        return service.listarAtrasados();
    }

    @GetMapping("/livro/{livroId}")
    public List<Emprestimo> historicoPorLivro(@PathVariable Long livroId) {
        return service.historicoPorLivro(livroId);
    }

    @PostMapping("/emprestar")
    public Emprestimo emprestar(@RequestBody Emprestimo emprestimo) {
        return service.emprestar(emprestimo);
    }

    @PostMapping("/{id}/devolver")
    public Emprestimo devolver(@PathVariable Long id) {
        return service.devolver(id);
    }
}