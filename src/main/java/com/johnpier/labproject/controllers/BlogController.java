package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.BlogPreviewDto;
import com.johnpier.labproject.services.BlogRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.BLOGS)
public class BlogController {

    private final BlogRepositoryService blogRepositoryService;

    @GetMapping(value = "/previews/all")
    public ResponseEntity<?> getAllBlogsPreviews(@RequestParam(required = false) String fromUserId) {
        List<BlogPreviewDto> blogsPreviews = null;

        if (fromUserId != null) {
            // TODO: добить
        }

        blogsPreviews = this.blogRepositoryService.getAllBlogsPreviews();
        return ResponseEntity.ok(blogsPreviews);
    }

    @GetMapping(value = "full/{blogId}")
    public ResponseEntity<?> getBlogById(@PathVariable String blogId) {
        try {
            return ResponseEntity.ok(this.blogRepositoryService.getBlogById(blogId));
        }catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
