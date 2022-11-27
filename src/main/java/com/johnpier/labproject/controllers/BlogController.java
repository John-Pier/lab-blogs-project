package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.repositories.BlogRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.BLOGS)
public class BlogController {

    private final BlogRepository blogRepository;

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllPosts(@RequestParam(required = false) String fromUserId) {
        var blogs = this.blogRepository.findAll().toArray();
        return ResponseEntity.ok(new Object[1]);
    }
}
