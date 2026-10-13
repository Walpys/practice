package com.TaskPlannerApplication.dto.projection.task;

public record PeriodCounts(
        long completedWeek,
        long uncompletedWeek,
        long completedMonth,
        long uncompletedMonth,
        long overdue
) {
}