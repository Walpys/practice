package com.TaskPlannerApplication.exception.auth;

import com.TaskPlannerApplication.exception.BasicAppException;

public class TokenHashingException extends BasicAppException {
    public TokenHashingException(String message, Throwable cause) {
        super(message);
        initCause(cause);
    }
}