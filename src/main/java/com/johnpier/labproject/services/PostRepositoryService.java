package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.*;
import com.johnpier.labproject.mappers.PostMappers;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
public class PostRepositoryService {
    private final PostRepository postRepository;
    private final EntityManager entityManager;

    public PostRepositoryService(PostRepository postRepository, EntityManager entityManager) {
        this.postRepository = postRepository;
        this.entityManager = entityManager;
    }

    public List<PostPreviewDto> getPostPreviewByBlogId(String blogId) {
        if (blogId == null) {
            return null;
        }
        final var posts = this.postRepository.findPostsByBlog_Id(blogId);

        return posts.stream().map(PostMappers::mapToPreviewDto).toList();
    }

    public PostDto getPostById(String postId) throws NoSuchElementException {
        if (postId == null) {
            return null;
        }
        final var post = this.postRepository.findById(postId).orElseThrow();

        return PostMappers.mapToPostDto(post);
    }

    public PostDto createPost(PostCreateDto postDto, User user) throws Exception {
        Post post = new Post();
        post.setCreatedAt(LocalDate.now());
        post.setUser(user);
        post.setContent(postDto.getContent());
        post.setDescription(postDto.getDescription());
        post.setLabel(postDto.getLabel());
        post.setPreview(postDto.getPreview());
        post.setBlog(entityManager.getReference(Blog.class, postDto.getBlogId()));

        return PostMappers.mapToPostDto(this.postRepository.save(post));
    }

    public PostDto editPost(PostCreateDto postDto, String postId) throws Exception {
        Post oldPost = this.postRepository.findById(postId).orElseThrow();
        oldPost.setDescription(postDto.getDescription());
        oldPost.setLabel(postDto.getLabel());
        oldPost.setPreview(postDto.getPreview());
        oldPost.setContent(postDto.getContent());

        return PostMappers.mapToPostDto(this.postRepository.save(oldPost));
    }
}
