package com.johnpier.labproject.entities;

import com.johnpier.labproject.models.EntitiesStatus;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
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

    @ManyToMany(mappedBy = "categories")
    private List<Blog> blogs;
}
