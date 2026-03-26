package com.squad.api.service;

import com.squad.api.dto.TaskRequest;
import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Status;
import com.squad.api.model.Task;
import com.squad.api.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional
    public Task createTask(TaskRequest request) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .quadrant(request.getQuadrant())
                .dueDate(request.getDueDate())
                .status(Status.PENDING)
                .matrix(request.getMatrix() != null ? request.getMatrix() : Matrix.PERSONAL)
                .build();
        return taskRepository.save(task);
    }

    @Transactional(readOnly = true)
    public List<Task> getAllTasksByMatrix(Matrix matrix) {
        return taskRepository.findAllByMatrixOrderByDueDate(matrix);
    }

    @Transactional(readOnly = true)
    public List<Task> getTasksByQuadrantAndMatrix(Quadrant quadrant, Matrix matrix) {
        return taskRepository.findByQuadrantAndMatrixOrderByDueDate(quadrant, matrix);
    }

    @Transactional
    public Task completeTask(UUID id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
        task.setStatus(Status.DONE);
        task.setCompletedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(UUID id) {
        if (!taskRepository.existsById(id)) {
            throw new EntityNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}
