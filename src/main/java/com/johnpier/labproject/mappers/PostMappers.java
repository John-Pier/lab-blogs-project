package com.johnpier.labproject.mappers;

import com.johnpier.labproject.entities.Post;
import com.johnpier.labproject.models.*;

public class PostMappers {
    public static PostPreviewDto mapToPreview(Post post) {
        final var postPreview = new PostPreviewDto();

        postPreview.setId(post.getId());
        postPreview.setBlogId(post.getBlog().getId()); // TODO: оч тяжело однако
        postPreview.setUserId(post.getUser().getUuid()); // TODO: оч тяжело однако
        postPreview.setLabel(post.getLabel());
        postPreview.setPreview(post.getPreview());
        postPreview.setDescription(post.getDescription());
        postPreview.setCommentsCount(post.getComments().size());
        postPreview.setCreatedAt(post.getCreatedAt());

        return postPreview;
    }

    public static PostDto mapToPost(Post post) {
        final var postDto = new PostDto();

        postDto.setId(post.getId());
        postDto.setBlogId(post.getBlog().getId()); // TODO: оч тяжело однако
        postDto.setUser(UserMappers.mapUserToShortUserDto(post.getUser()));
        postDto.setLabel(post.getLabel());
        postDto.setDescription(post.getDescription());
        postDto.setContent(post.getContent());
        postDto.setCreatedAt(post.getCreatedAt());

        return postDto;
    }
}
