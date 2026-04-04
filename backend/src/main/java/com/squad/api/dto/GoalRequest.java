package com.squad.api.dto;

import com.squad.api.model.GoalCategory;
import com.squad.api.model.GoalStatus;
import com.squad.api.model.GoalTimeframe;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be at most 255 characters")
    private String title;

    @Size(max = 2000, message = "Description must be at most 2000 characters")
    private String description;

    @NotNull(message = "Category is required")
    private GoalCategory category;

    @NotNull(message = "Timeframe is required")
    private GoalTimeframe timeframe;

    private GoalStatus status;

    @Min(value = 0, message = "Progress must be between 0 and 100")
    @Max(value = 100, message = "Progress must be between 0 and 100")
    private int progress;

    private LocalDate dueDate;
}
