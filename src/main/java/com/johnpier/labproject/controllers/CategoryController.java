package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Constants;
import com.johnpier.labproject.entities.Category;
import com.johnpier.labproject.repositories.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*", maxAge = 4800, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT}, allowedHeaders = "*")
@RestController
@RequestMapping(Constants.API_VERSION)
@Slf4j
public class CategoryController {

    private final CategoryRepository categoryRepository;

    CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(required = false) String title) {
        //
        return null;
    }
}
