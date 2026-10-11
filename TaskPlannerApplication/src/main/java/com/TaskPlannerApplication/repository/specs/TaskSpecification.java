package com.TaskPlannerApplication.repository.specs;

import com.TaskPlannerApplication.common.QueryParams.task.TaskListByUserQueryParameters;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.enums.task.TaskCategory;
import com.TaskPlannerApplication.enums.task.TaskPriority;
import com.TaskPlannerApplication.enums.task.TaskStatus;

import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class TaskSpecification {

    public static Specification<Task> withFilters(UUID userId, TaskListByUserQueryParameters params) {
        Specification<Task> spec = hasUser(userId);

        if (params == null) {
            return spec;
        }

        if (params.getCategories() != null && !params.getCategories().isEmpty()) {
            spec = spec.and(hasCategories(params.getCategories()));
        }

        if (params.getStatuses() != null && !params.getStatuses().isEmpty()) {
            spec = spec.and(hasStatuses(params.getStatuses()));
        }

        if (params.getPriorities() != null && !params.getPriorities().isEmpty()) {
            spec = spec.and(hasPriorities(params.getPriorities()));
        }

        if (params.getFilterMode() != null) {
            switch (params.getFilterMode()) {
                case TODAY -> spec = spec.and(isToday());
                case ALLTIME -> {
                }
            }
        }

        return spec;
    }


    public static Specification<Task> hasUser(UUID userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Task> hasCategories(List<TaskCategory> categories) {
        return (root, query, cb) -> root.get("category").in(categories);
    }

    public static Specification<Task> hasStatuses(List<TaskStatus> statuses) {
        return (root, query, cb) -> root.get("status").in(statuses);
    }

    public static Specification<Task> hasPriorities(List<TaskPriority> priorities) {
        return (root, query, cb) -> root.get("priority").in(priorities);
    }

    public static Specification<Task> isToday() {
        return (root, query, cb) -> {
            LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
            LocalDateTime endOfDay = LocalDate.now().atTime(23, 59, 59);
            return cb.between(root.get("dueDate"), startOfDay, endOfDay);
        };
    }
}