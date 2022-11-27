package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.entities.Post;
import com.johnpier.labproject.repositories.PostRepository;
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

    private final PostRepository postRepository;

    @GetMapping(value = "/all")
    public List<Post> getAllPosts(@RequestParam(required = false) String fromUserId) {
        var posts = this.postRepository.findAll();

        return posts;
    }
}
