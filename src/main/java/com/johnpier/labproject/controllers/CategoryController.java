package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.*;
import com.johnpier.labproject.entities.Category;
import com.johnpier.labproject.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.CATEGORIES)
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @Secured("ADMIN")
    @GetMapping(value = "/categories")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(required = false) String title) {
        //
        return null;
    }
}
