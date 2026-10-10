package com.TaskPlannerApplication.exception.task;

import com.TaskPlannerApplication.exception.BasicAppException;

public class TaskNotFoundException extends BasicAppException {
    public TaskNotFoundException(String message) {
        super(message);
    }
    
}
