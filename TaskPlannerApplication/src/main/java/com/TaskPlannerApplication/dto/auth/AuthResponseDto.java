package com.TaskPlannerApplication.dto.auth;

import java.util.UUID;

public record AuthResponseDto(
        String accessToken,
        UUID userId,
        String refreshToken
) {
}