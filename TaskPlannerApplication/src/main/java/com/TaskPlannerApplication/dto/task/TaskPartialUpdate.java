package com.TaskPlannerApplication.dto.task;

import com.TaskPlannerApplication.config.ValidationProperties;
import com.TaskPlannerApplication.enums.task.TaskCategory;
import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.openapitools.jackson.nullable.JsonNullable;

import java.time.LocalDateTime;

public record TaskPartialUpdate(
        @Size(min = ValidationProperties.TASK_TITLE_MIN_LENGTH, max = ValidationProperties.TASK_TITLE_MAX_LENGTH, message = "Task title must be between "
                + ValidationProperties.TASK_TITLE_MIN_LENGTH + " and " + ValidationProperties.TASK_TITLE_MAX_LENGTH
                + " characters")
        JsonNullable<String> title,

        @Size(max = ValidationProperties.TASK_DESC_MAX_LENGTH, message = "Description must not exceed "
                + ValidationProperties.TASK_DESC_MAX_LENGTH + " characters")
        JsonNullable<String> description,

        JsonNullable<TaskCategory> category,

        JsonNullable<TaskPriority> priority,

        JsonNullable<TaskStatus> status,

        @FutureOrPresent(message = "Due date must be in the present or future")
        JsonNullable<LocalDateTime> dueDate
) {
}