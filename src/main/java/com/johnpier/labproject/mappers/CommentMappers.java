package com.johnpier.labproject.mappers;

import com.johnpier.labproject.entities.Comment;
import com.johnpier.labproject.models.CommentDto;

public class CommentMappers {
    public static CommentDto mapToComment(Comment comment) {
        final var commentDto = new CommentDto();

        commentDto.setId(comment.getUuid());
        //commentDto.setPostId(comment.getPost().getId());
        commentDto.setContent(comment.getContent());
        commentDto.setUser(UserMappers.mapUserToShortUserDto(comment.getUser()));
        commentDto.setCreatedAt(comment.getCreatedAt());
        commentDto.setUpdatedAt(comment.getUpdatedAt());
        return  commentDto;
    }
}
