package com.TaskPlannerApplication.dto.task;

import java.time.LocalDateTime;

import com.TaskPlannerApplication.config.ValidationProperties;
import com.TaskPlannerApplication.enums.task.TaskCategory;
import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TaskCreateDto(
        @NotBlank(message = "Task title cannot be blank") @Size(min = ValidationProperties.TASK_TITLE_MIN_LENGTH, max = ValidationProperties.TASK_TITLE_MAX_LENGTH, message = "Task title must be between "
                + ValidationProperties.TASK_TITLE_MIN_LENGTH + " and " + ValidationProperties.TASK_TITLE_MAX_LENGTH
                + " characters") String title,

        @Size(max = ValidationProperties.TASK_DESC_MAX_LENGTH, message = "Description must not exceed "
                + ValidationProperties.TASK_DESC_MAX_LENGTH + " characters") String description,

        @NotNull(message = "Task category is required") TaskCategory category,

        @NotNull(message = "Task priority is required") TaskPriority priority,

        @NotNull(message = "Task status is required") TaskStatus status,

        @NotNull(message = "Due date is required") @FutureOrPresent(message = "Due date must be in the present or future") LocalDateTime dueDate) {
}