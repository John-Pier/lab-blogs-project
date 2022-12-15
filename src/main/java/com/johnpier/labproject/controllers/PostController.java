package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.entities.enums.UserRole;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.models.errors.ErrorModel;
import com.johnpier.labproject.models.validators.PostsValidators;
import com.johnpier.labproject.services.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.POSTS)
public class PostController {
    private final PostRepositoryService postRepositoryService;
    private final BlogRepositoryService blogRepositoryService;
    private final UserRepositoryService userRepositoryService;
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
    public ResponseEntity<?> createPost(@RequestBody() PostCreateDto post, @RequestHeader("Authorization") String auth) {
        try {
            PostsValidators.validateCreatePostModel(post);

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var roles = jwtTokenUtil.getUserRoleFromToken(token);

            var blog = this.blogRepositoryService.getBlogById(post.getBlogId());
            var user = userRepositoryService.getUserByLogin(tokenLogin);
            var userId = user.getUuid();

            if (!Objects.equals(userId, blog.getCreatedBy().getId()) && !roles.contains(UserRole.MODERATOR) && !roles.contains(UserRole.ADMIN)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
            post.setUserId(userId);

            return ResponseEntity.ok(this.postRepositoryService.createPost(post, user));
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }
}
