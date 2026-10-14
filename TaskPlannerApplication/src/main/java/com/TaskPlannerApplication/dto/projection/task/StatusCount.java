package com.TaskPlannerApplication.dto.projection.task;

import com.TaskPlannerApplication.enums.task.TaskStatus;

public interface StatusCount {
    TaskStatus getStatus();

    long getCnt();
}
