package com.TaskPlannerApplication.service;


import com.TaskPlannerApplication.common.QueryParams.task.TaskListByUserQueryParameters;
import com.TaskPlannerApplication.common.helper.PagingHelper;
import com.TaskPlannerApplication.dto.projection.task.PeriodCounts;
import com.TaskPlannerApplication.dto.projection.task.StatusCount;
import com.TaskPlannerApplication.dto.task.*;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.enums.task.TaskStatus;
import com.TaskPlannerApplication.exception.task.TaskNotFoundException;
import com.TaskPlannerApplication.mapper.MappingHelper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskCreateDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskDetailsDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskFullUpdateDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskShortDtoMapper;
import com.TaskPlannerApplication.repository.TaskRepository;
import com.TaskPlannerApplication.repository.specs.TaskSpecification;
import com.TaskPlannerApplication.security.SecurityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;
    private final SecurityService securityService;
    
    private final TaskCreateDtoMapper taskCreateDtoMapper;
    private final TaskDetailsDtoMapper taskDetailsDtoMapper;
    private final TaskShortDtoMapper taskShortDtoMapper;
    private final TaskFullUpdateDtoMapper taskFullUpdateDtoMapper;

    @Transactional
    public TaskDetailsDto createTask(UUID currentUserId, TaskCreateDto createDto) {

        User user = userService.findEntityById(currentUserId);
        Task task = taskCreateDtoMapper.toEntity(createDto);
        task.setUser(user);
        Task savedTask = taskRepository.save(task);
        return taskDetailsDtoMapper.toDto(savedTask);
    }

    @Transactional(readOnly = true)
    public Page<TaskShortDto> getTasksByUser(UUID userId, TaskListByUserQueryParameters queryParameters) {
        Pageable pageable = PagingHelper.toPageable(queryParameters);

        Specification<Task> spec = TaskSpecification.withFilters(userId, queryParameters);

        Page<Task> taskPage = taskRepository.findAll(spec, pageable);
        return taskPage.map(taskShortDtoMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public TaskDetailsDto getTaskById(UUID taskId) {
        Task task = findEntityById(taskId);

        return taskDetailsDtoMapper.toDto(task);
    }

    @Transactional
    public TaskDetailsDto updateTask(UUID taskId, TaskFullUpdateDto updateDto) {
        Task task = findEntityById(taskId);


        taskFullUpdateDtoMapper.updateEntityFromDto(updateDto, task);

        Task updatedTask = taskRepository.save(task);
        return taskDetailsDtoMapper.toDto(updatedTask);
    }
    @Transactional
    public TaskDetailsDto partialUpdateTask(UUID taskId, TaskPartialUpdate updateDto) {
        Task task = findEntityById(taskId);

        MappingHelper.updateIfPresent(updateDto.title(), task::setTitle);
        MappingHelper.updateIfPresent(updateDto.description(), task::setDescription);
        MappingHelper.updateIfPresent(updateDto.category(), task::setCategory);
        MappingHelper.updateIfPresent(updateDto.priority(), task::setPriority);
        MappingHelper.updateIfPresent(updateDto.status(), task::setStatus);
        MappingHelper.updateIfPresent(updateDto.dueDate(), task::setDueDate);

        Task updatedTask = taskRepository.save(task);
        return taskDetailsDtoMapper.toDto(updatedTask);
    }


    @Transactional(readOnly = true)
    public TaskDetailsStatsDto getStatsDetails(UUID userId) {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime weekStart = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).with(LocalTime.MIN);
        LocalDateTime weekEnd = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)).with(LocalTime.MAX);

        LocalDateTime monthStart = now.with(TemporalAdjusters.firstDayOfMonth()).with(LocalTime.MIN);
        LocalDateTime monthEnd = now.with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);



        Map<String, Long> statusBreakdown = taskRepository.countByStatus(userId).stream()
                .collect(Collectors.toMap(
                        s -> s.getStatus().name(),
                        StatusCount::getCnt
                ));

        long total = statusBreakdown.values().stream().mapToLong(Long::longValue).sum();

        PeriodCounts p = taskRepository.getPeriodCounts(
                userId,
                TaskStatus.COMPLETED,
                now,
                weekStart,
                weekEnd,
                monthStart,
                monthEnd
        );

        Map<String, Double> rates = taskRepository.countByCategory(userId, TaskStatus.COMPLETED).stream()
                .collect(Collectors.toMap(
                        c -> c.getCategory().name(),
                        c -> c.getTotal() == 0 ? 0.0 : (double) c.getDone() * 100.0 / c.getTotal()
                ));

        return new TaskDetailsStatsDto(
                total,
                statusBreakdown,
                p.completedWeek(),
                p.uncompletedWeek(),
                p.completedMonth(),
                p.uncompletedMonth(),
                rates,
                p.overdue()
        );
    }

    @Transactional(readOnly = true)
    public TaskStatsDto getTaskStatsByUser(UUID userId) {
        return taskRepository.getTaskStatsByUser(userId);
    }

    @Transactional
    public void deleteTask(UUID taskId) {
        Task task = findEntityById(taskId);

        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    public Task findEntityById(UUID taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + taskId));
    }
}