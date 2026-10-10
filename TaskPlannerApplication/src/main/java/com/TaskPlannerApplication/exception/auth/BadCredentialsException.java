package com.TaskPlannerApplication.exception.auth;

import com.TaskPlannerApplication.exception.BasicAppException;

public class BadCredentialsException extends BasicAppException {
    public BadCredentialsException() {
        super("A password or login is wrong");
    }
}