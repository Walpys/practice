package com.TaskPlannerApplication.exception;

public abstract class BasicAppException extends RuntimeException {
    protected BasicAppException(String message) {
        super(message);
    }
}