package com.TaskPlannerApplication.mapper;

import java.util.function.Consumer;

public final class MappingHelper {

    private MappingHelper() {}

    public static <T> void updateIfPresent(T value, Consumer<T> updater) {
        if (value != null) {
            updater.accept(value);
        }
    }
}