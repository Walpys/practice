package com.TaskPlannerApplication.dto.task;

public record TaskStatsDto(
        long totalTasks,
        long inProgressTasks,
        long completedTasks
) {}