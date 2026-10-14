package com.TaskPlannerApplication.dto.task;

import java.util.Map;

public record TaskDetailsStatsDto(
        long totalTasks,
        Map<String, Long> statusBreakdown,
        long completedThisWeek,
        long uncompletedThisWeek,
        long completedThisMonth,
        long uncompletedThisMonth,
        Map<String, Double> categoryCompletionRates,
        long overdueTasksCount
) {
}