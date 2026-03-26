package com.squad.api.controller;

import com.squad.api.dto.TaskRequest;
import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Task;
import com.squad.api.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request) {
        Task task = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(
            @RequestParam(required = false) Quadrant quadrant,
            @RequestParam(required = false, defaultValue = "PERSONAL") Matrix matrix) {
        if (quadrant != null) {
            return ResponseEntity.ok(taskService.getTasksByQuadrantAndMatrix(quadrant, matrix));
        }
        return ResponseEntity.ok(taskService.getAllTasksByMatrix(matrix));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable UUID id) {
        Task task = taskService.completeTask(id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
