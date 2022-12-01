package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PostPreviewDto implements Serializable {
    private String id;
    private String label;
    private String description;
    private String preview;
    private LocalDate createdAt;
    private int commentsCount;
    private String userId;
    private String blogId;
}
