package com.squad.api;

import com.squad.api.dto.TaskRequest;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Status;
import com.squad.api.model.Task;
import com.squad.api.repository.TaskRepository;
import com.squad.api.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void createTask_success() {
        TaskRequest request = new TaskRequest("Buy groceries", "Milk and eggs", Quadrant.Q1, null);
        Task savedTask = Task.builder()
                .id(UUID.randomUUID())
                .title("Buy groceries")
                .description("Milk and eggs")
                .quadrant(Quadrant.Q1)
                .status(Status.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        Task result = taskService.createTask(request);

        assertThat(result).isNotNull();
        assertThat(result.getTitle()).isEqualTo("Buy groceries");
        assertThat(result.getQuadrant()).isEqualTo(Quadrant.Q1);
        assertThat(result.getStatus()).isEqualTo(Status.PENDING);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getAllTasks_returnsList() {
        Task task1 = Task.builder().id(UUID.randomUUID()).title("Task 1").quadrant(Quadrant.Q1).status(Status.PENDING).build();
        Task task2 = Task.builder().id(UUID.randomUUID()).title("Task 2").quadrant(Quadrant.Q2).status(Status.DONE).build();

        when(taskRepository.findAllOrderByDueDate()).thenReturn(Arrays.asList(task1, task2));

        List<Task> result = taskService.getAllTasks();

        assertThat(result).hasSize(2);
        assertThat(result).containsExactlyInAnyOrder(task1, task2);
        verify(taskRepository, times(1)).findAllOrderByDueDate();
    }

    @Test
    void completeTask_setsStatusAndDate() {
        UUID taskId = UUID.randomUUID();
        Task task = Task.builder()
                .id(taskId)
                .title("Task to complete")
                .quadrant(Quadrant.Q3)
                .status(Status.PENDING)
                .build();
        Task completedTask = Task.builder()
                .id(taskId)
                .title("Task to complete")
                .quadrant(Quadrant.Q3)
                .status(Status.DONE)
                .completedAt(LocalDateTime.now())
                .build();

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(completedTask);

        Task result = taskService.completeTask(taskId);

        assertThat(result.getStatus()).isEqualTo(Status.DONE);
        assertThat(result.getCompletedAt()).isNotNull();
        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void completeTask_throwsWhenNotFound() {
        UUID taskId = UUID.randomUUID();
        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> taskService.completeTask(taskId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining(taskId.toString());
    }

    @Test
    void deleteTask_callsRepository() {
        UUID taskId = UUID.randomUUID();
        when(taskRepository.existsById(taskId)).thenReturn(true);
        doNothing().when(taskRepository).deleteById(taskId);

        taskService.deleteTask(taskId);

        verify(taskRepository, times(1)).existsById(taskId);
        verify(taskRepository, times(1)).deleteById(taskId);
    }

    @Test
    void deleteTask_throwsWhenNotFound() {
        UUID taskId = UUID.randomUUID();
        when(taskRepository.existsById(taskId)).thenReturn(false);

        assertThatThrownBy(() -> taskService.deleteTask(taskId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining(taskId.toString());
    }
}
