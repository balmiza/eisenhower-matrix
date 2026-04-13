package com.squad.api.controller;

import com.squad.api.dto.WeeklyGoalRequest;
import com.squad.api.model.WeeklyGoal;
import com.squad.api.service.WeeklyGoalService;
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
@RequestMapping("/api/weekly-goals")
@RequiredArgsConstructor
@Tag(name = "Weekly Goals", description = "Gerenciamento de metas semanais")
public class WeeklyGoalController {

    private final WeeklyGoalService weeklyGoalService;

    @Operation(summary = "Criar meta semanal")
    @ApiResponse(responseCode = "201", description = "Meta criada com sucesso")
    @PostMapping
    public ResponseEntity<WeeklyGoal> create(@Valid @RequestBody WeeklyGoalRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(weeklyGoalService.create(request, userId));
    }

    @Operation(summary = "Listar metas semanais ordenadas por prioridade")
    @ApiResponse(responseCode = "200", description = "Lista de metas")
    @GetMapping
    public ResponseEntity<List<WeeklyGoal>> getAll() {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(weeklyGoalService.getAll(userId));
    }

    @Operation(summary = "Atualizar meta semanal")
    @ApiResponse(responseCode = "200", description = "Meta atualizada")
    @PutMapping("/{id}")
    public ResponseEntity<WeeklyGoal> update(
            @Parameter(description = "ID da meta") @PathVariable UUID id,
            @Valid @RequestBody WeeklyGoalRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(weeklyGoalService.update(id, request, userId));
    }

    @Operation(summary = "Concluir meta semanal")
    @ApiResponse(responseCode = "200", description = "Meta concluída")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<WeeklyGoal> complete(
            @Parameter(description = "ID da meta") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(weeklyGoalService.complete(id, userId));
    }

    @Operation(summary = "Deletar meta semanal")
    @ApiResponse(responseCode = "204", description = "Meta deletada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID da meta") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        weeklyGoalService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }
}
