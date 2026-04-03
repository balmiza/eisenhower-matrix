package com.squad.api.dto;

import com.squad.api.model.JournalEntryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JournalEntryRequest {

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Type is required")
    private JournalEntryType type;

    @NotBlank(message = "Content is required")
    private String content;
}
