package com.squad.api.controller;

import com.squad.api.dto.JournalEntryRequest;
import com.squad.api.model.JournalEntry;
import com.squad.api.service.JournalEntryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Journal", description = "Gerenciamento do Diário de Bordo")
public class JournalEntryController {

    private final JournalEntryService journalEntryService;

    @Operation(summary = "Criar entrada", description = "Cria uma nova entrada no Diário de Bordo")
    @ApiResponse(responseCode = "201", description = "Entrada criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(@Valid @RequestBody JournalEntryRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(journalEntryService.createEntry(request, userId));
    }

    @Operation(summary = "Listar entradas", description = "Retorna todas as entradas ordenadas por data")
    @ApiResponse(responseCode = "200", description = "Lista de entradas")
    @GetMapping
    public ResponseEntity<List<JournalEntry>> getAllEntries() {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(journalEntryService.getAllEntries(userId));
    }

    @Operation(summary = "Atualizar entrada", description = "Atualiza todos os campos de uma entrada")
    @ApiResponse(responseCode = "200", description = "Entrada atualizada")
    @ApiResponse(responseCode = "404", description = "Entrada não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<JournalEntry> updateEntry(
            @Parameter(description = "ID da entrada") @PathVariable UUID id,
            @Valid @RequestBody JournalEntryRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(journalEntryService.updateEntry(id, request, userId));
    }

    @Operation(summary = "Deletar entrada", description = "Remove uma entrada permanentemente")
    @ApiResponse(responseCode = "204", description = "Entrada deletada")
    @ApiResponse(responseCode = "404", description = "Entrada não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(
            @Parameter(description = "ID da entrada") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        journalEntryService.deleteEntry(id, userId);
        return ResponseEntity.noContent().build();
    }
}
