package com.johnpier.labproject.services;

import com.johnpier.labproject.mappers.PostMappers;
import com.johnpier.labproject.models.PostPreviewDto;
import com.johnpier.labproject.repositories.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
