package com.squad.api.controller;

import com.squad.api.dto.GoalRequest;
import com.squad.api.model.Goal;
import com.squad.api.service.GoalService;
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
@RequestMapping("/api/goals")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Goals", description = "Gerenciamento de metas do PDI")
public class GoalController {

    private final GoalService goalService;

    @Operation(summary = "Criar meta", description = "Cria uma nova meta no PDI")
    @ApiResponse(responseCode = "201", description = "Meta criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<Goal> createGoal(@Valid @RequestBody GoalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(goalService.createGoal(request));
    }

    @Operation(summary = "Listar metas", description = "Retorna todas as metas ordenadas por prazo")
    @ApiResponse(responseCode = "200", description = "Lista de metas")
    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @Operation(summary = "Atualizar meta", description = "Atualiza todos os campos de uma meta")
    @ApiResponse(responseCode = "200", description = "Meta atualizada")
    @ApiResponse(responseCode = "404", description = "Meta não encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(
            @Parameter(description = "ID da meta") @PathVariable UUID id,
            @Valid @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.updateGoal(id, request));
    }

    @Operation(summary = "Deletar meta", description = "Remove uma meta permanentemente")
    @ApiResponse(responseCode = "204", description = "Meta deletada")
    @ApiResponse(responseCode = "404", description = "Meta não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(
            @Parameter(description = "ID da meta") @PathVariable UUID id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }
}
