package com.squad.api.controller;

import com.squad.api.dto.TaskRequest;
import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Task;
import com.squad.api.service.TaskService;
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
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Tag(name = "Tasks", description = "Gerenciamento de tarefas da Matriz de Eisenhower")
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "Criar tarefa", description = "Cria uma nova tarefa em um quadrante da matriz")
    @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Task task = taskService.createTask(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @Operation(summary = "Listar tarefas", description = "Retorna tarefas filtradas por matriz e opcionalmente por quadrante")
    @ApiResponse(responseCode = "200", description = "Lista de tarefas")
    @GetMapping
    public ResponseEntity<List<Task>> getTasks(
            @Parameter(description = "Filtrar por quadrante (Q1, Q2, Q3, Q4)")
            @RequestParam(required = false) Quadrant quadrant,
            @Parameter(description = "Filtrar por matriz (PERSONAL ou WORK)")
            @RequestParam(required = false, defaultValue = "PERSONAL") Matrix matrix) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (quadrant != null) {
            return ResponseEntity.ok(taskService.getTasksByQuadrantAndMatrix(quadrant, matrix, userId));
        }
        return ResponseEntity.ok(taskService.getAllTasksByMatrix(matrix, userId));
    }

    @Operation(summary = "Concluir tarefa", description = "Marca uma tarefa como concluída")
    @ApiResponse(responseCode = "200", description = "Tarefa concluída")
    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(
            @Parameter(description = "ID da tarefa") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Task task = taskService.completeTask(id, userId);
        return ResponseEntity.ok(task);
    }

    @Operation(summary = "Mover tarefa", description = "Move uma tarefa para outro quadrante")
    @ApiResponse(responseCode = "200", description = "Tarefa movida")
    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    @PatchMapping("/{id}/move")
    public ResponseEntity<Task> moveTask(
            @Parameter(description = "ID da tarefa") @PathVariable UUID id,
            @Parameter(description = "Quadrante destino (Q1, Q2, Q3, Q4)") @RequestParam Quadrant quadrant) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Task task = taskService.moveTask(id, quadrant, userId);
        return ResponseEntity.ok(task);
    }

    @Operation(summary = "Deletar tarefa", description = "Remove uma tarefa permanentemente")
    @ApiResponse(responseCode = "204", description = "Tarefa deletada")
    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "ID da tarefa") @PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        taskService.deleteTask(id, userId);
        return ResponseEntity.noContent().build();
    }
}
