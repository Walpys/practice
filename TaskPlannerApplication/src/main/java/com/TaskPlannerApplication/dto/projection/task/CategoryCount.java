package com.TaskPlannerApplication.dto.projection.task;

import com.TaskPlannerApplication.enums.task.TaskCategory;

public interface CategoryCount {
    TaskCategory getCategory();

    long getTotal();

    long getDone();
}