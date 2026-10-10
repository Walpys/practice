package com.TaskPlannerApplication.config;

public final class ValidationProperties {
    private ValidationProperties() {}

    public static final int USERNAME_MIN_LENGTH = 3;
    public static final int USERNAME_MAX_LENGTH = 50;
    
    public static final int PASSWORD_MIN_LENGTH = 6;
    public static final int PASSWORD_MAX_LENGTH = 100;


    public static final int TASK_TITLE_MIN_LENGTH = 1;
    public static final int TASK_TITLE_MAX_LENGTH = 100;

    public static final int TASK_DESC_MAX_LENGTH = 500;
}