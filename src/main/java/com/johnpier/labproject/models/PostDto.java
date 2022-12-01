package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@lombok.Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PostDto implements Serializable {
    private String id;
    private String label;
    private String description;
    private LocalDate createdAt;
    private ShortUserDto user;
    private String blogId;
    private String content;
}
