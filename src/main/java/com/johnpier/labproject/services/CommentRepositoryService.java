package com.johnpier.labproject.services;

import com.johnpier.labproject.mappers.CommentMappers;
import com.johnpier.labproject.models.CommentDto;
import com.johnpier.labproject.repositories.CommentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class CommentRepositoryService {
    private final CommentRepository commentRepository;

    public List<CommentDto> findCommentsByPostId(String postId) {
        var comments = this.commentRepository.findCommentsByPost_id(postId);
        return comments.stream().map(CommentMappers::mapToComment).toList();
    }
}
