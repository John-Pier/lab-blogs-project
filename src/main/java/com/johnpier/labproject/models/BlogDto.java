package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@lombok.Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BlogDto implements Serializable {
    private String id;
    private String name;
    private String description;
    private EntitiesStatus status = null;
    private LocalDate createdAt;
    private List<PostPreviewDto> posts;
    private ShortUserDto createdBy;
    private List<CategoryDto> categories;
}
