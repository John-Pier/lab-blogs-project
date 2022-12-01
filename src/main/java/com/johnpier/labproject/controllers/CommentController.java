package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.services.CommentRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.COMMENTS)
public class CommentController {
    private final CommentRepositoryService commentRepositoryService;

    @GetMapping(value = "")
    public ResponseEntity<?> getAllPosts(@RequestParam(required = false) String postId) {
        if(postId == null) {
            return ResponseEntity.badRequest().body("[]");
        }
        return ResponseEntity.ok(this.commentRepositoryService.findCommentsByPostId(postId));
    }
}
