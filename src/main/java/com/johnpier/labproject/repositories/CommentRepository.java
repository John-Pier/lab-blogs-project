package com.johnpier.labproject.repositories;

import com.johnpier.labproject.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findCommentsByPost_id(String postId);
}
