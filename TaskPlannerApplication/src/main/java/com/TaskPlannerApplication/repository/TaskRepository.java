package com.TaskPlannerApplication.repository;

import java.util.List;
import java.util.UUID;

import com.TaskPlannerApplication.dto.task.TaskStatsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.TaskPlannerApplication.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, UUID>, JpaSpecificationExecutor<Task> {
    List<Task> findByUserId(UUID userId);

    @Query(value = """
                SELECT 
                    COUNT(*) as total_tasks,
                    SUM(CASE WHEN status::text = 'IN_PROGRESS' THEN 1 ELSE 0 END) as in_progress_tasks,
                    SUM(CASE WHEN status::text = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tasks
                FROM tasks
                WHERE user_id = :userId
            """, nativeQuery = true)
    TaskStatsDto getTaskStatsByUser(@Param("userId") UUID userId);
}
