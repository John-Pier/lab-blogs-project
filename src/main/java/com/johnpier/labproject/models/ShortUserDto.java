package com.johnpier.labproject.models;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ShortUserDto {
    private String id;
    private String firstName;
    private String secondName;
    private String city;
    private Byte gender;
}
