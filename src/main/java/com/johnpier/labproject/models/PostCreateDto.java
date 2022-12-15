package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PostCreateDto implements Serializable {
    private String id;
    private String label;
    private String description;
    private String userId;
    private String blogId;
    private String content;
    private String preview;
}
