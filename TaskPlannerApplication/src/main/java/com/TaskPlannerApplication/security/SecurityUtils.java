package com.TaskPlannerApplication.security;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;

@Component 
public class SecurityUtils {

    public String extractDeviceInfo(HttpServletRequest request) {
        if (request == null) {
            return "Unknown Device";
        }
        String userAgent = request.getHeader("User-Agent");
        return userAgent != null ? userAgent : "Unknown Browser";
    }

    public String extractClientIp(HttpServletRequest request) {
        if (request == null) {
            return "127.0.0.1";
        }
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}