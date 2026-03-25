package com.squad.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.squad.api.controller.TaskController;
import com.squad.api.dto.TaskRequest;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Status;
import com.squad.api.model.Task;
import com.squad.api.service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@ActiveProfiles("test")
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createTask_returns201() throws Exception {
        TaskRequest request = new TaskRequest("New Task", "Description", Quadrant.Q1);
        Task createdTask = Task.builder()
                .id(UUID.randomUUID())
                .title("New Task")
                .description("Description")
                .quadrant(Quadrant.Q1)
                .status(Status.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        when(taskService.createTask(any(TaskRequest.class))).thenReturn(createdTask);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Task"))
                .andExpect(jsonPath("$.quadrant").value("Q1"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void getAllTasks_returns200() throws Exception {
        Task task1 = Task.builder().id(UUID.randomUUID()).title("Task 1").quadrant(Quadrant.Q1).status(Status.PENDING).createdAt(LocalDateTime.now()).build();
        Task task2 = Task.builder().id(UUID.randomUUID()).title("Task 2").quadrant(Quadrant.Q2).status(Status.DONE).createdAt(LocalDateTime.now()).build();

        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task1, task2));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void completeTask_returns200() throws Exception {
        UUID taskId = UUID.randomUUID();
        Task completedTask = Task.builder()
                .id(taskId)
                .title("Task")
                .quadrant(Quadrant.Q1)
                .status(Status.DONE)
                .createdAt(LocalDateTime.now())
                .completedAt(LocalDateTime.now())
                .build();

        when(taskService.completeTask(eq(taskId))).thenReturn(completedTask);

        mockMvc.perform(patch("/api/tasks/{id}/complete", taskId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DONE"));
    }

    @Test
    void deleteTask_returns204() throws Exception {
        UUID taskId = UUID.randomUUID();
        doNothing().when(taskService).deleteTask(eq(taskId));

        mockMvc.perform(delete("/api/tasks/{id}", taskId))
                .andExpect(status().isNoContent());
    }
}
