package com.TaskPlannerApplication.exception.user;

import com.TaskPlannerApplication.exception.BasicAppException;

public class UserNotFoundException extends BasicAppException {
    public UserNotFoundException(String message) {
        super(message);
    }
}