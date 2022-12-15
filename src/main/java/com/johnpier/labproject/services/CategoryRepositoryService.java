package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.Category;
import com.johnpier.labproject.mappers.CategoriesMappers;
import com.johnpier.labproject.models.CategoryDto;
import com.johnpier.labproject.repositories.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CategoryRepositoryService {
    private final CategoryRepository categoryRepository;

    public CategoryRepositoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getAllCategories() {
        final var categories = this.categoryRepository.findAll();

        return categories.stream().map(CategoriesMappers::mapToCategoryDto).toList();
    }

    public List<Category> findCategories(List<String> ids) {
        return this.categoryRepository.findAllById(ids);
    }
}
