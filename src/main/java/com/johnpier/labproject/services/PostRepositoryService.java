package com.johnpier.labproject.services;

import com.johnpier.labproject.mappers.PostMappers;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.models.validators.PostsValidators;
import com.johnpier.labproject.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class PostRepositoryService {
    private final PostRepository postRepository;

    public PostRepositoryService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<PostPreviewDto> getPostPreviewByBlogId(String blogId) {
        if (blogId == null) {
            return null;
        }
        final var posts = this.postRepository.findPostsByBlog_Id(blogId);

        return posts.stream().map(PostMappers::mapToPreview).toList();
    }

    public PostDto getPostById(String postId) throws NoSuchElementException {
        if (postId == null) {
            return null;
        }
        final var post = this.postRepository.findById(postId).orElseThrow();

        return PostMappers.mapToPost(post);
    }

    public PostDto createPost(PostDto post) throws Exception {
        PostsValidators.validateCreatePostModel(post);

//        final var post = this.postRepository.findById(postId).orElseThrow();

        return null; // PostMappers.mapToPost(post);
    }
}
