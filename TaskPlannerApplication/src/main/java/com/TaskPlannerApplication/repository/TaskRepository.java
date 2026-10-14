package com.TaskPlannerApplication.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.TaskPlannerApplication.dto.projection.task.CategoryCount;
import com.TaskPlannerApplication.dto.projection.task.PeriodCounts;
import com.TaskPlannerApplication.dto.projection.task.StatusCount;
import com.TaskPlannerApplication.dto.task.TaskStatsDto;
import com.TaskPlannerApplication.enums.task.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.TaskPlannerApplication.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, UUID>, JpaSpecificationExecutor<Task> {
    List<Task> findByUserId(UUID userId);

    @Query(value = """
                SELECT 
                    COALESCE(COUNT(*), 0) as total_tasks,
                    COALESCE(SUM(CASE WHEN status::text = 'IN_PROGRESS' THEN 1 ELSE 0 END), 0) as in_progress_tasks,
                    COALESCE(SUM(CASE WHEN status::text = 'COMPLETED' THEN 1 ELSE 0 END), 0) as completed_tasks
                FROM tasks
                WHERE user_id = :userId
            """, nativeQuery = true)
    TaskStatsDto getTaskStatsByUser(@Param("userId") UUID userId);


    @Query("""
                SELECT t.status AS status, COUNT(t) AS cnt
                FROM Task t WHERE t.user.id = :userId
                GROUP BY t.status
            """)
    List<StatusCount> countByStatus(@Param("userId") UUID userId);


    @Query("""
                SELECT new com.TaskPlannerApplication.dto.projection.task.PeriodCounts(
                  COUNT(CASE WHEN t.status = :done  AND t.dueDate BETWEEN :weekStart  AND :weekEnd  THEN 1 END),
                  COUNT(CASE WHEN t.status <> :done AND t.dueDate BETWEEN :weekStart  AND :weekEnd  THEN 1 END),
                  COUNT(CASE WHEN t.status = :done  AND t.dueDate BETWEEN :monthStart AND :monthEnd THEN 1 END),
                  COUNT(CASE WHEN t.status <> :done AND t.dueDate BETWEEN :monthStart AND :monthEnd THEN 1 END),
                  COUNT(CASE WHEN t.status <> :done AND t.dueDate < :now THEN 1 END)
                )
                FROM Task t WHERE t.user.id = :userId
            """)
    PeriodCounts getPeriodCounts(
            @Param("userId") UUID userId,
            @Param("done") TaskStatus done,
            @Param("now") LocalDateTime now,
            @Param("weekStart") LocalDateTime weekStart,
            @Param("weekEnd") LocalDateTime weekEnd,
            @Param("monthStart") LocalDateTime monthStart,
            @Param("monthEnd") LocalDateTime monthEnd
    );


    @Query("""
                SELECT t.category AS category, COUNT(t) AS total,
                       COUNT(CASE WHEN t.status = :done THEN 1 END) AS done
                FROM Task t
                WHERE t.user.id = :userId
                GROUP BY t.category
            """)
    List<CategoryCount> countByCategory(@Param("userId") UUID userId, @Param("done") TaskStatus done);
}
