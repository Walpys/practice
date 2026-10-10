package com.TaskPlannerApplication.dto.task;

import java.time.LocalDateTime;
import java.util.UUID;


import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;

public record TaskShortDto(
        UUID id,
        String title,
        TaskPriority priority,
        TaskStatus status,
        LocalDateTime dueDate,
        LocalDateTime createdAt
) {

}
