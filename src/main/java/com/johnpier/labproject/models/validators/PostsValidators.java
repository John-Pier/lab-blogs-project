package com.johnpier.labproject.models.validators;

import com.johnpier.labproject.models.PostDto;

public class PostsValidators {
    public static void validateCreatePostModel(PostDto postDto) throws Exception {
        var isInvalid = postDto == null || postDto.getBlogId() == null || postDto.getContent() == null || postDto.getDescription() == null || postDto.getLabel() == null;

        if (isInvalid) {
            throw new Exception("Нет необходимых полей!");
        }
        if (postDto.getContent().length() < 200) {
            throw new Exception("Слишком короткий пост!");
        }
        if (postDto.getDescription().length() > 200) {
            throw new Exception("Слишком длинное описание!");
        }
    }
}
