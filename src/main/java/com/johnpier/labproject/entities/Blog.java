package com.johnpier.labproject.entities;


import com.johnpier.labproject.models.EntitiesStatus;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "blogs")
@lombok.Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog implements Serializable {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "status")
    private EntitiesStatus status = null;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @OneToMany(mappedBy = "blog")
    private List<Post> posts;

    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "UUID")
    private User createdBy;

    @ManyToMany
    @JoinTable(
            name = "categories_blogs",
            joinColumns = @JoinColumn(name = "blog_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    private List<Category> categories;
}
