package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.controllers.validators.BlogDtoValidators;
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
@RequestMapping(path = Routes.BLOGS)
public class BlogController {
    private final UserRepositoryService userRepositoryService;
    private final JwtTokenUtil jwtTokenUtil;
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
            return ResponseEntity.ok(this.blogRepositoryService.getBlogDtoById(blogId));
        }catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "")
    public ResponseEntity<?> createBlog(@RequestBody() BlogCreateDto blogDto, @RequestHeader("Authorization") String auth) {
        try {
            BlogDtoValidators.validateCreateBlogModel(blogDto);

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var user = userRepositoryService.getUserByLogin(tokenLogin);

            return ResponseEntity.ok(this.blogRepositoryService.createBlog(blogDto, user));
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }

    @PutMapping(value = "/{blogId}")
    public ResponseEntity<?> editBlog(@RequestBody() BlogCreateDto blogDto, @PathVariable String blogId, @RequestHeader("Authorization") String auth) {
        try {
            BlogDtoValidators.validateCreateBlogModel(blogDto);

            var token = JwtTokenUtil.getBearerToken(auth);
            var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
            var roles = jwtTokenUtil.getUserRoleFromToken(token);

            var blog = this.blogRepositoryService.getBlogById(blogId);
            if (blog == null) {
                throw new Exception("Такого блога не существует");
            }

            var user = userRepositoryService.getUserByLogin(tokenLogin);
            var userId = user.getUuid();
            var blogUserId = blog.getCreatedBy().getUuid();

            if (!Objects.equals(userId, blogUserId) && !UserRoles.isModeratorAccess(roles)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
            }

            return ResponseEntity.ok(this.blogRepositoryService.editBlog(blogDto, blog));
        }catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorModel(ex.getMessage()));
        }
    }
}
