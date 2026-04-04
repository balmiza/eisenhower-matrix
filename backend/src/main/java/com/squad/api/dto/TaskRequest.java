package com.squad.api.dto;

import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be at most 255 characters")
    private String title;

    @Size(max = 2000, message = "Description must be at most 2000 characters")
    private String description;

    @NotNull(message = "Quadrant is required")
    private Quadrant quadrant;

    private LocalDateTime dueDate;

    private Matrix matrix;
}
