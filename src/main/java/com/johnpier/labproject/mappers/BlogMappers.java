package com.johnpier.labproject.mappers;

import com.johnpier.labproject.entities.Blog;
import com.johnpier.labproject.models.*;

public class BlogMappers {
    public static BlogPreviewDto mapToPreview(Blog blog) {
        final var blogPreview = new BlogPreviewDto();

        blogPreview.setId(blog.getId());
        blogPreview.setName(blog.getName());
        blogPreview.setCreatedBy(UserMappers.mapUserToShortUserDto(blog.getCreatedBy()));
        blogPreview.setDescription(blog.getDescription());
        blogPreview.setCreatedAt(blog.getCreatedAt());
        blogPreview.setPostsCount(blog.getPosts().size()); // TODO: оч тяжело однако
        var categories = blog.getCategories().stream().map(CategoriesMappers::mapToCategoryDto).toList();
        blogPreview.setCategories(categories);

        return blogPreview;
    }

    public static BlogDto mapToBlog(Blog blog) {
        final var blogDto = new BlogDto();
        var posts = blog.getPosts().stream().map(PostMappers::mapToPreview).toList();
        var categories = blog.getCategories().stream().map(CategoriesMappers::mapToCategoryDto).toList();

        blogDto.setId(blog.getId());
        blogDto.setName(blog.getName());
        blogDto.setDescription(blog.getDescription());
        blogDto.setStatus(blog.getStatus());
        blogDto.setCreatedAt(blog.getCreatedAt());
        blogDto.setPosts(posts);
        blogDto.setCreatedBy(UserMappers.mapUserToShortUserDto(blog.getCreatedBy()));
        blogDto.setCategories(categories);

        return blogDto;
    }
}
