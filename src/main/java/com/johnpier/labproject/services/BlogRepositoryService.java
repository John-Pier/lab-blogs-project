package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.*;
import com.johnpier.labproject.mappers.BlogMappers;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.repositories.BlogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
public class BlogRepositoryService {
    private final BlogRepository blogRepository;
    private final EntityManager entityManager;
    private final CategoryRepositoryService categoryRepositoryService;

    public BlogRepositoryService(BlogRepository blogRepository, EntityManager entityManager, CategoryRepositoryService categoryRepositoryService) {
        this.blogRepository = blogRepository;
        this.entityManager = entityManager;
        this.categoryRepositoryService = categoryRepositoryService;
    }

    public List<BlogPreviewDto> getAllBlogsPreviews() {
        final var blogs = this.blogRepository.findAll();

        return blogs.stream().map(BlogMappers::mapToPreview).toList();
    }

    public BlogDto getBlogDtoById(String blogId) throws NoSuchElementException {
        var blog = this.blogRepository.findById(blogId).orElseThrow();
        return BlogMappers.mapToBlog(blog);
    }

    public Blog getBlogById(String blogId) throws NoSuchElementException {
        return this.blogRepository.findById(blogId).orElse(null);
    }

    public BlogDto createBlog(BlogCreateDto blogDto, User user) {
        var blog = new Blog();
        blog.setCreatedAt(LocalDate.now());
        blog.setCreatedBy(user);
        blog.setName(blogDto.getName());
        blog.setDescription(blogDto.getDescription());
//        var categories = blogDto.getCategories().stream().map(it -> entityManager.getReference(Category.class, it)).toList();
        blog.setCategories(this.categoryRepositoryService.findCategories(blogDto.getCategories()));

        return BlogMappers.mapToBlog(this.blogRepository.save(blog));
    }

    public BlogDto editBlog(BlogCreateDto blogDto, Blog blog) {
        blog.setName(blogDto.getName());
        blog.setDescription(blogDto.getDescription());
        blog.setCategories(this.categoryRepositoryService.findCategories(blogDto.getCategories()));

        return BlogMappers.mapToBlog(this.blogRepository.save(blog));
    }
}
