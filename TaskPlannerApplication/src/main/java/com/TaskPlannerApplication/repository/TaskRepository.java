package com.TaskPlannerApplication.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TaskPlannerApplication.entity.Task;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    
}
