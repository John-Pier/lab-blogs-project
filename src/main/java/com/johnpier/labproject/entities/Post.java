package com.johnpier.labproject.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String id;

    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "preview")
    private String preview;

    @Column(name = "content")
    private String content;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @ManyToOne()
    @JoinColumn(name = "owner_user_uuid")
    private User user;
}
