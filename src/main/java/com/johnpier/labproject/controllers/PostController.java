package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.PostPreviewDto;
import com.johnpier.labproject.services.PostRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.POSTS)
public class PostController {

    private final PostRepositoryService postRepositoryService;

    @GetMapping(value = "/previews")
    public List<PostPreviewDto> getPostsPreview(@RequestParam() String blogId) {
        return this.postRepositoryService.getPostPreviewByBlogId(blogId);
    }
}
