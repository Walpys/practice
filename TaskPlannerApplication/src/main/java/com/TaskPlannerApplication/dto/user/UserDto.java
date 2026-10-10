package com.TaskPlannerApplication.dto.user;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserDto(
    UUID id,
    String userName,
    LocalDateTime createdAt
) {
}