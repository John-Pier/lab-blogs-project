package com.johnpier.labproject.entities;


import com.johnpier.labproject.models.EntitiesStatus;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "blogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "status")
    private EntitiesStatus status = null;

    @Column(name = "created_at")
    private Date createdAt;

    @OneToMany(mappedBy = "blog")
    private List<Post> posts;

    @ManyToOne()
    @JoinColumn(name = "created_by", referencedColumnName = "UUID")
    private User createdBy;

    @ManyToMany()
    @JoinTable(
            name = "categories_blogs",
            joinColumns = @JoinColumn(name = "blog_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    private List<Category> categories;
}
