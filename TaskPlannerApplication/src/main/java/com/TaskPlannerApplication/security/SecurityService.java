package com.TaskPlannerApplication.security;

import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service("securityService")
@RequiredArgsConstructor
public class SecurityService {

    private final UserRepository userRepository;

    public boolean isUserOwner(UUID targetUserId) {
        if (targetUserId == null) {
            return false;
        }
        return getCurrentUserId()
                .map(currentId -> currentId.equals(targetUserId))
                .orElse(false);
    }

    public Optional<UUID> getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User currentUser) {
            return Optional.ofNullable(currentUser.getId());
        }

        String username = authentication.getName();
        if (username == null || username.equals("anonymousUser")) {
            return Optional.empty();
        }

        return userRepository.findByUserName(username)
                .map(User::getId);
    }
   
}