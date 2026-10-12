package com.TaskPlannerApplication.controller;

import com.TaskPlannerApplication.config.AppConfig;
import com.TaskPlannerApplication.config.JwtProperties;
import com.TaskPlannerApplication.dto.auth.AuthResponseDto;
import com.TaskPlannerApplication.dto.auth.LoginDto;
import com.TaskPlannerApplication.dto.auth.RegisterDto;
import com.TaskPlannerApplication.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProperties jwtProperties;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody RegisterDto dto,
            HttpServletRequest request
    ) {
        AuthResponseDto response = authService.register(dto, request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto dto,
                                                 HttpServletRequest request,
                                                 HttpServletResponse response) {
        AuthResponseDto result = authService.login(dto, request);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", result.refreshToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofMillis(jwtProperties.getRefreshExpiration()))
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(result);
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