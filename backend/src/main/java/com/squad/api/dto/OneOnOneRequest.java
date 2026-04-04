package com.squad.api.dto;

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
public class OneOnOneRequest {

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Manager is required")
    @Size(max = 255, message = "Manager must be at most 255 characters")
    private String manager;

    @Size(max = 3000, message = "Agenda must be at most 3000 characters")
    private String agenda;

    @Size(max = 5000, message = "Notes must be at most 5000 characters")
    private String notes;

    @Size(max = 3000, message = "Next steps must be at most 3000 characters")
    private String nextSteps;
}
