package com.TaskPlannerApplication.mapper;

import org.openapitools.jackson.nullable.JsonNullable;

import java.util.function.Consumer;

public final class MappingHelper {

    private MappingHelper() {}

    public static <T> void updateIfPresent(T value, Consumer<T> updater) {
        if (value != null) {
            updater.accept(value);
        }
    }
    public static <T> void updateIfPresent(JsonNullable<T> nullableValue, Consumer<T> updater) {
        if (nullableValue != null && nullableValue.isPresent()) {
            updater.accept(nullableValue.get());
        }
    }
}