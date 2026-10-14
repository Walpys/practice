package com.TaskPlannerApplication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@Configuration 
@ConfigurationProperties (prefix = "app.api")
public class AppConfig {
    private String apiKey;

    @Value("${app.cookie.secure}")
    private boolean isSecured;
}
