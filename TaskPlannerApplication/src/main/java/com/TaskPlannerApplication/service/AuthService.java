package com.TaskPlannerApplication.service;

import com.TaskPlannerApplication.config.JwtProperties;
import com.TaskPlannerApplication.dto.auth.AuthResponseDto;
import com.TaskPlannerApplication.dto.auth.LoginDto;
import com.TaskPlannerApplication.dto.auth.RegisterDto;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.entity.auth.RefreshToken;
import com.TaskPlannerApplication.exception.auth.BadCredentialsException;
import com.TaskPlannerApplication.exception.auth.InvalidRefreshTokenException;
import com.TaskPlannerApplication.exception.auth.TokenHashingException;
import com.TaskPlannerApplication.exception.user.UserAlreadyExistsException;
import com.TaskPlannerApplication.repository.UserRepository;
import com.TaskPlannerApplication.repository.auth.RefreshTokenRepository;
import com.TaskPlannerApplication.security.JwtService;
import com.TaskPlannerApplication.security.SecurityUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor 
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SecurityUtils securityUtils;
    private final JwtProperties jwtProperties;
    @Transactional
    public AuthResponseDto register(RegisterDto dto, HttpServletRequest request) {
        if (userRepository.existsByUserName(dto.username())) {
            throw new UserAlreadyExistsException(dto.username());
        }

        User user = User.builder()
                .userName(dto.username())
                .passwordHash(passwordEncoder.encode(dto.password()))
                .build();

        userRepository.save(user);
        
        String deviceInfo = securityUtils.extractDeviceInfo(request);
        String ipAddress = securityUtils.extractClientIp(request);

        return generateTokensForUser(user, deviceInfo, ipAddress);
    }

    @Transactional
    public AuthResponseDto login(LoginDto dto, HttpServletRequest request) {
        User user = userRepository.findByUserName(dto.username())
                .orElseThrow(BadCredentialsException::new);

        if (!passwordEncoder.matches(dto.password(), user.getPasswordHash())) {
            throw new BadCredentialsException();
        }

        String deviceInfo = securityUtils.extractDeviceInfo(request);
        String ipAddress = securityUtils.extractClientIp(request);

        return generateTokensForUser(user, deviceInfo, ipAddress);
    }

    @Transactional
    public AuthResponseDto refreshToken(String rawRefreshToken) {
        String tokenHash = hashToken(rawRefreshToken);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new InvalidRefreshTokenException("Invalid refresh token"));

        if (storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(storedToken);
            throw new InvalidRefreshTokenException("Refresh token has expired");
        }

        User user = storedToken.getUser();
        String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getUserName());

        return new AuthResponseDto(newAccessToken, rawRefreshToken);
    }

    private AuthResponseDto generateTokensForUser(User user, String deviceInfo, String ipAddress) {
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getUserName());
        
        String rawRefreshToken = UUID.randomUUID().toString() + "-" + UUID.randomUUID().toString();
        String tokenHash = hashToken(rawRefreshToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenHash(tokenHash)
                .deviceInfo(deviceInfo)
                .ipAddress(ipAddress)
                .expiresAt(LocalDateTime.now().plus(Duration.ofMillis(jwtProperties.getRefreshExpiration())))
                .user(user)
                .build();

        refreshTokenRepository.save(refreshToken);

        return new AuthResponseDto(accessToken, rawRefreshToken);
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new TokenHashingException("Token hashing error", e);
        }
    }
}