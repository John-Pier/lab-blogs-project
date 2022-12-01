package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BlogPreviewDto implements Serializable {
    private String id;
    private String name;
    private String description;
    private LocalDate createdAt;
    private int postsCount;
    private ShortUserDto createdBy;
    private List<CategoryDto> categories;
}
