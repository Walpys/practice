package com.TaskPlannerApplication.exception.auth;

import com.TaskPlannerApplication.exception.BasicAppException;

public class InvalidRefreshTokenException extends BasicAppException {
    public InvalidRefreshTokenException(String message) {
        super(message);
    }
}