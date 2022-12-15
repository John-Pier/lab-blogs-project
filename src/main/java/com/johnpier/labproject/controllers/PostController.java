package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.controllers.validators.PostsDtoValidators;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.models.errors.ErrorModel;
import com.johnpier.labproject.services.*;
import com.johnpier.labproject.utils.UserRoles;
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
            PostsDtoValidators.validateCreatePostModel(post);

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var blog = this.blogRepositoryService.getBlogById(post.getBlogId());
            var user = userRepositoryService.getUserByLogin(tokenLogin);
            var userId = user.getUuid();
            var blogUserId = blog.getCreatedBy().getId();

            if (!Objects.equals(userId, blogUserId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }
            post.setUserId(userId);

            return ResponseEntity.ok(this.postRepositoryService.createPost(post, user));
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }

    @PutMapping(value = "/{postId}")
    public ResponseEntity<?> editPost(@RequestBody() PostCreateDto post, @PathVariable String postId, @RequestHeader("Authorization") String auth) {
        try {
            PostsDtoValidators.validateEditPostModel(post);

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var roles = jwtTokenUtil.getUserRoleFromToken(token);

            var blog = this.blogRepositoryService.getBlogById(post.getBlogId());
            var user = userRepositoryService.getUserByLogin(tokenLogin);
            var userId = user.getUuid();
            var blogUserId = blog.getCreatedBy().getId();

            if (!Objects.equals(userId, blogUserId) && !UserRoles.isModeratorAccess(roles)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            return ResponseEntity.ok(this.postRepositoryService.editPost(post, postId));
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }
}
