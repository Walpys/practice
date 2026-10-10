package com.TaskPlannerApplication.dto.user;

import com.TaskPlannerApplication.config.ValidationProperties;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserFullUpdateDto(
    @NotBlank(message = "Username cannot be blank")
    @Size(min = ValidationProperties.USERNAME_MIN_LENGTH, max = ValidationProperties.USERNAME_MAX_LENGTH, message = "Username must be between " + ValidationProperties.USERNAME_MIN_LENGTH + " and " + ValidationProperties.USERNAME_MAX_LENGTH + " characters")
    String userName
) {
}
