package com.TaskPlannerApplication.repository.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TaskPlannerApplication.entity.auth.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    
    void deleteByUserId(UUID userId);
    Optional<RefreshToken> findByTokenHash (String tokenHash);
    
}
