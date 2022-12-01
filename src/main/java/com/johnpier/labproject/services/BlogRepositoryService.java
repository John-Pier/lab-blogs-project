package com.johnpier.labproject.services;

import com.johnpier.labproject.mappers.BlogMappers;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.repositories.BlogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class BlogRepositoryService {
    private final BlogRepository blogRepository;

    public BlogRepositoryService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<BlogPreviewDto> getAllBlogsPreviews() {
        final var blogs = this.blogRepository.findAll();

        return blogs.stream().map(BlogMappers::mapToPreview).toList();
    }

    public BlogDto getBlogById(String blogId) throws NoSuchElementException {
        var blog = this.blogRepository.findById(blogId).orElseThrow();
        return BlogMappers.mapToBlog(blog);
    }
}
