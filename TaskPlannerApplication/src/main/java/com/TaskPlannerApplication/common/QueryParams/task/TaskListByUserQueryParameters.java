package com.TaskPlannerApplication.common.QueryParams.task;

import java.util.List;

import com.TaskPlannerApplication.common.QueryParams.QueryParameters;
import com.TaskPlannerApplication.enums.task.TaskCategory;
import com.TaskPlannerApplication.enums.task.TaskFilterMode;
import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter 
public class TaskListByUserQueryParameters extends QueryParameters {
    private TaskFilterMode filterMode = TaskFilterMode.ALLTIME;
    private List<TaskCategory> categories;
    private List<TaskStatus> statuses;
    private List<TaskPriority> priorities;
}
