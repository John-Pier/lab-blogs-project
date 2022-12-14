package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.models.errors.ErrorModel;
import com.johnpier.labproject.models.validators.PostsValidators;
import com.johnpier.labproject.services.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.POSTS)
public class PostController {
    private final PostRepositoryService postRepositoryService;
    private final BlogRepositoryService blogRepositoryService;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping(value = "/previews")
    public List<PostPreviewDto> getPostsPreview(@RequestParam() String blogId) {
        return this.postRepositoryService.getPostPreviewByBlogId(blogId);
    }


    @GetMapping(value = "full/{postId}")
    public ResponseEntity<?> getPostsById(@PathVariable String postId) {
        try {
            return ResponseEntity.ok(this.postRepositoryService.getPostById(postId));
        }catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "")
    public ResponseEntity<?> createPost(@RequestBody() PostDto post, @RequestHeader("Authorization") String auth) {
        try {
            PostsValidators.validateCreatePostModel(post);

            var blog = this.blogRepositoryService.getBlogById(post.getBlogId());

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var roles = jwtTokenUtil.getUserRoleFromToken(token);

            post.setCreatedAt(LocalDate.now());

//            if (!Objects.equals(tokenLogin, blog.getCreatedBy().getId())) {
//                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
//            }

            return ResponseEntity.ok(this.postRepositoryService.createPost(post));
        }catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }
}
