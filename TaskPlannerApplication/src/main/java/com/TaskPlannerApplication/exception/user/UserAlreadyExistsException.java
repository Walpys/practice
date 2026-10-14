package com.TaskPlannerApplication.exception.user;

import com.TaskPlannerApplication.exception.BasicAppException;

public class UserAlreadyExistsException extends BasicAppException {
    public UserAlreadyExistsException(String username) {
        super("user with name '" + username + "' already exists");
    }
}