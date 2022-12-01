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
public class CommentDto implements Serializable {
    private String uuid;
    private LocalDate updatedAt = null;
    private LocalDate createdAt;
    private String content;
    private String userId;
    private String postId;
}
