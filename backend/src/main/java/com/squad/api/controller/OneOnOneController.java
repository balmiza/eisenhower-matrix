package com.squad.api.controller;

import com.squad.api.dto.OneOnOneRequest;
import com.squad.api.model.OneOnOne;
import com.squad.api.service.OneOnOneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/one-on-ones")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "1:1s", description = "Gerenciamento de reuniões one-on-one")
public class OneOnOneController {

    private final OneOnOneService oneOnOneService;

    @Operation(summary = "Criar reunião 1:1", description = "Cria uma nova reunião one-on-one")
    @ApiResponse(responseCode = "201", description = "Reunião criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<OneOnOne> createOneOnOne(@Valid @RequestBody OneOnOneRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(oneOnOneService.createOneOnOne(request));
    }

    @Operation(summary = "Listar reuniões 1:1", description = "Retorna todas as reuniões ordenadas por data")
    @ApiResponse(responseCode = "200", description = "Lista de reuniões")
    @GetMapping
    public ResponseEntity<List<OneOnOne>> getAllOneOnOnes() {
        return ResponseEntity.ok(oneOnOneService.getAllOneOnOnes());
    }

    @Operation(summary = "Atualizar reunião 1:1", description = "Atualiza todos os campos de uma reunião")
    @ApiResponse(responseCode = "200", description = "Reunião atualizada")
    @ApiResponse(responseCode = "404", description = "Reunião não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<OneOnOne> updateOneOnOne(
            @Parameter(description = "ID da reunião") @PathVariable UUID id,
            @Valid @RequestBody OneOnOneRequest request) {
        return ResponseEntity.ok(oneOnOneService.updateOneOnOne(id, request));
    }

    @Operation(summary = "Deletar reunião 1:1", description = "Remove uma reunião permanentemente")
    @ApiResponse(responseCode = "204", description = "Reunião deletada")
    @ApiResponse(responseCode = "404", description = "Reunião não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOneOnOne(
            @Parameter(description = "ID da reunião") @PathVariable UUID id) {
        oneOnOneService.deleteOneOnOne(id);
        return ResponseEntity.noContent().build();
    }
}
