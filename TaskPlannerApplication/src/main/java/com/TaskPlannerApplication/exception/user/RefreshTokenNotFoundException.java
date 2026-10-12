package com.TaskPlannerApplication.exception.user;

import com.TaskPlannerApplication.exception.BasicAppException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class RefreshTokenNotFoundException extends BasicAppException {
    public RefreshTokenNotFoundException(String message) {
        super(message);
    }
}