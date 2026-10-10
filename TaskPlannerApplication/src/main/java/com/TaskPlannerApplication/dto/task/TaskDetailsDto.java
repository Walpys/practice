package com.TaskPlannerApplication.dto.task;

import java.time.LocalDateTime;
import java.util.UUID;

import com.TaskPlannerApplication.enums.task.TaskCategory;
import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;

public record TaskDetailsDto(
        UUID id,
        String title,
        String description,
        TaskCategory category,
        TaskPriority priority,
        TaskStatus status,
        LocalDateTime dueDate,
        LocalDateTime createdAt) {

}
