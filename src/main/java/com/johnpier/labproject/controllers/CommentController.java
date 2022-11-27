package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.entities.Comment;
import com.johnpier.labproject.repositories.CommentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.COMMENTS)
public class CommentController {

    private final CommentRepository commentRepository;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Comment>> getAllPosts(@RequestParam(required = false) String fromUserId) {
        return ResponseEntity.ok(this.commentRepository.findAll());
    }
}
