package com.squad.api.dto;

import com.squad.api.model.JournalEntryType;
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
public class JournalEntryRequest {

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Type is required")
    private JournalEntryType type;

    @NotBlank(message = "Content is required")
    @Size(max = 10000, message = "Content must be at most 10000 characters")
    private String content;
}
