package com.TaskPlannerApplication.controller;

import com.TaskPlannerApplication.dto.auth.AuthResponseDto;
import com.TaskPlannerApplication.dto.auth.LoginDto;
import com.TaskPlannerApplication.dto.auth.RefreshTokenRequestDto;
import com.TaskPlannerApplication.dto.auth.RegisterDto;
import com.TaskPlannerApplication.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody RegisterDto dto,
            HttpServletRequest request
    ) {
        AuthResponseDto response = authService.register(dto, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody LoginDto dto,
            HttpServletRequest request
    ) {
        AuthResponseDto response = authService.login(dto, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDto> refresh(
            @RequestBody RefreshTokenRequestDto dto
    ) {
        AuthResponseDto response = authService.refreshToken(dto.refreshToken());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestBody RefreshTokenRequestDto dto
    ) {
        authService.logout(dto.refreshToken());
        return ResponseEntity.noContent().build();
    }
}