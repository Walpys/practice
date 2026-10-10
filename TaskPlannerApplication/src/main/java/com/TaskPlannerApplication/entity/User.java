package com.TaskPlannerApplication.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.TaskPlannerApplication.entity.auth.RefreshToken;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data 
@Table (name = "users")
@Builder 
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Column (name = "id", nullable = false, updatable = false)
    @GeneratedValue (strategy = GenerationType.UUID)
    @Id 
    private UUID id;

    @Column (name = "username", nullable = false, unique = true)
    private String userName;

    @Column (name = "password_hash", nullable = false)
    private String passwordHash;

    @CreatedDate
    @Column (name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens;
}
