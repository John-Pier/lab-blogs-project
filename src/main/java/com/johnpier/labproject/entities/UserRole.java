package com.johnpier.labproject.entities;

import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "permissions", nullable = false)
    private Byte permissions;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;
}
