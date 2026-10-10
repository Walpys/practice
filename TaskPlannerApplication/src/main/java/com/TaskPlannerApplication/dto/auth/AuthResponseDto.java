package com.TaskPlannerApplication.dto.auth;

public record AuthResponseDto(
    String refreshToken,
    String acessToken
) {
    
}
