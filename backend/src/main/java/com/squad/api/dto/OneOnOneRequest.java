package com.squad.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    private String manager;

    private String agenda;

    private String notes;

    private String nextSteps;
}
