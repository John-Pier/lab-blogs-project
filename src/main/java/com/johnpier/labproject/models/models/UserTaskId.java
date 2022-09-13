package com.johnpier.labproject.models.models;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
@AllArgsConstructor
public class UserTaskId implements Serializable {

    /*@Column(name = "user_uuid", nullable = false)
    private String userUUID;

    @Column(name = "task_uuid", nullable = false)
    private String taskUUID;*/

}