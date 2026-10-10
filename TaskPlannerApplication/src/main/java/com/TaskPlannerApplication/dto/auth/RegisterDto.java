package com.TaskPlannerApplication.dto.auth;

import com.TaskPlannerApplication.config.ValidationProperties;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDto(
   @NotBlank (message = "Username cannot be blank")
   @Size(min = ValidationProperties.USERNAME_MIN_LENGTH, max = ValidationProperties.USERNAME_MAX_LENGTH, 
          message = "Username must be between " + ValidationProperties.USERNAME_MIN_LENGTH + " and " + ValidationProperties.USERNAME_MAX_LENGTH + " characters")
   String username,
   
   @NotBlank (message = "Password cannot be blank")
   @Size(min = ValidationProperties.PASSWORD_MIN_LENGTH, max = ValidationProperties.PASSWORD_MAX_LENGTH, 
          message = "Password must be between " + ValidationProperties.PASSWORD_MIN_LENGTH + " and " + ValidationProperties.PASSWORD_MAX_LENGTH + " characters")
   String password
) {

}
