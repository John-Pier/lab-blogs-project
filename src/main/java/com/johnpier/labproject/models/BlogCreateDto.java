package com.johnpier.labproject.models;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class BlogCreateDto implements Serializable {
    private String name;
    private String description;
    private List<String> categories;
}
