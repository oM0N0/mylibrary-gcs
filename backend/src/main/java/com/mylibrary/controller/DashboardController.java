package com.mylibrary.controller;

import com.mylibrary.dto.DashboardDTO;
import com.mylibrary.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardDTO obterResumo() {
        return service.obterResumo();
    }
}