package com.TaskPlannerApplication.controller;

import com.TaskPlannerApplication.common.QueryParams.task.TaskListByUserQueryParameters;
import com.TaskPlannerApplication.dto.task.TaskCreateDto;
import com.TaskPlannerApplication.dto.task.TaskDetailsDto;
import com.TaskPlannerApplication.dto.task.TaskFullUpdateDto;
import com.TaskPlannerApplication.dto.task.TaskShortDto;
import com.TaskPlannerApplication.security.SecurityService;
import com.TaskPlannerApplication.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final SecurityService securityService;

    @PostMapping
    public ResponseEntity<TaskDetailsDto> createTask(
            @Valid @RequestBody TaskCreateDto createDto
    ) {
        UUID currentUserId = securityService.getCurrentUserId()
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));

        TaskDetailsDto createdTask = taskService.createTask(currentUserId, createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @GetMapping
    public ResponseEntity<Page<TaskShortDto>> getMyTasks(
            TaskListByUserQueryParameters queryParameters
    ) {
        UUID currentUserId = securityService.getCurrentUserId()
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));

        Page<TaskShortDto> tasks = taskService.getTasksByUser(currentUserId, queryParameters);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{taskId}")
    @PreAuthorize("@securityService.isTaskOwner(#taskId)")
    public ResponseEntity<TaskDetailsDto> getTaskById(
            @PathVariable UUID taskId
    ) {
        TaskDetailsDto task = taskService.getTaskById(taskId);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{taskId}")
    @PreAuthorize("@securityService.isTaskOwner(#taskId)")
    public ResponseEntity<TaskDetailsDto> updateTask(
            @PathVariable UUID taskId,
            @Valid @RequestBody TaskFullUpdateDto updateDto
    ) {
        TaskDetailsDto updatedTask = taskService.updateTask(taskId, updateDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    @PreAuthorize("@securityService.isTaskOwner(#taskId)")
    public ResponseEntity<Void> deleteTask(
            @PathVariable UUID taskId
    ) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}