package com.johnpier.labproject.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_roles")
@lombok.Data
@NoArgsConstructor
@AllArgsConstructor
public class NamedUserRole implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "permissions", nullable = false)
    private Byte permissions;

//    @ManyToMany(mappedBy = "roles")
//    private List<User> users;
}
