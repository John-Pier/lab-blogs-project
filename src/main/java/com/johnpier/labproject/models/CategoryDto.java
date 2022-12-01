package com.johnpier.labproject.models;

import lombok.*;

@lombok.Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CategoryDto {
    private String id;
    private String name;
    private String description;
}
