package com.johnpier.labproject.mappers;

import com.johnpier.labproject.entities.Category;
import com.johnpier.labproject.models.CategoryDto;

public class CategoriesMappers {
    public static CategoryDto mapToCategoryDto(Category category) {
        final var categoryDto = new CategoryDto();

        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());

        return categoryDto;
    }
}
