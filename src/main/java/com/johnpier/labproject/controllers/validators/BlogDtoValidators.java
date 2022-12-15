package com.johnpier.labproject.controllers.validators;

import com.johnpier.labproject.models.BlogCreateDto;

public class BlogDtoValidators {
    public static void validateCreateBlogModel(BlogCreateDto blogCreateDto) throws Exception {
        var isInvalid = blogCreateDto == null || blogCreateDto.getName() == null || blogCreateDto.getCategories() == null || blogCreateDto.getDescription() == null;

        if (isInvalid) {
            throw new Exception("Нет необходимых полей!");
        }
        if (blogCreateDto.getName().length() < 5) {
            throw new Exception("Слишком короткое имя!");
        }
        if (blogCreateDto.getName().length() > 60) {
            throw new Exception("Слишком длинное имя!");
        }
        if (blogCreateDto.getDescription().length() > 200) {
            throw new Exception("Слишком длинное описание!");
        }
        if (blogCreateDto.getCategories().size() == 0) {
            throw new Exception("Добавьте категории!");
        }
    }

    public static void validateEditPostModel(BlogCreateDto blogCreateDto) throws Exception {
        var isInvalid = blogCreateDto == null || blogCreateDto.getName() == null || blogCreateDto.getCategories() == null || blogCreateDto.getDescription() == null;

        if (isInvalid) {
            throw new Exception("Нет необходимых полей!");
        }
//        if (postDto.getContent().length() < 200) {
//            throw new Exception("Слишком короткий пост!");
//        }
//        if (postDto.getDescription().length() > 200) {
//            throw new Exception("Слишком длинное описание!");
//        }
    }
}
