package com.TaskPlannerApplication.exception;

import com.TaskPlannerApplication.exception.auth.BadCredentialsException;
import com.TaskPlannerApplication.exception.auth.InvalidRefreshTokenException;
import com.TaskPlannerApplication.exception.user.RefreshTokenNotFoundException;
import com.TaskPlannerApplication.exception.user.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Map<Class<? extends BasicAppException>, HttpStatus> EXCEPTION_STATUS_MAP = Map.of(
            UserAlreadyExistsException.class, HttpStatus.CONFLICT,
            BadCredentialsException.class, HttpStatus.UNAUTHORIZED,
            InvalidRefreshTokenException.class, HttpStatus.UNAUTHORIZED,
            RefreshTokenNotFoundException.class, HttpStatus.UNAUTHORIZED
    );

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
                String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        fieldErrors.put(fieldName, errorMessage);
        });

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", HttpStatus.BAD_REQUEST.getReasonPhrase());
        body.put("message", "Validation failed");
        body.put("details", fieldErrors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BasicAppException.class)
    public ResponseEntity<Object> handleBasicAppException(BasicAppException ex) {
        HttpStatus status = EXCEPTION_STATUS_MAP.getOrDefault(ex.getClass(), HttpStatus.BAD_REQUEST);

        return buildErrorResponse(ex.getMessage(), status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex) {
        return buildErrorResponse("Internal server error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Object> buildErrorResponse(String message, HttpStatus status) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        return new ResponseEntity<>(body, status);
    }
}