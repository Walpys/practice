package com.TaskPlannerApplication.controller;

import com.TaskPlannerApplication.dto.auth.AuthResponseDto;
import com.TaskPlannerApplication.dto.auth.LoginDto;
import com.TaskPlannerApplication.dto.auth.RegisterDto;
import com.TaskPlannerApplication.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public ResponseEntity<AuthResponseDto> refresh(HttpServletRequest request) {
        String refreshToken = extractRefreshTokenFromCookies(request);
        AuthResponseDto response = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        String refreshToken = extractRefreshTokenFromCookies(request);
        authService.logout(refreshToken);
        return ResponseEntity.noContent().build();
    }

    private String extractRefreshTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token cookie not found");
    }
}