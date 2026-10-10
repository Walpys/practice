package com.TaskPlannerApplication.service;


import com.TaskPlannerApplication.common.QueryParams.task.TaskListByUserQueryParameters;
import com.TaskPlannerApplication.dto.task.TaskCreateDto;
import com.TaskPlannerApplication.dto.task.TaskDetailsDto;
import com.TaskPlannerApplication.dto.task.TaskFullUpdateDto;
import com.TaskPlannerApplication.dto.task.TaskShortDto;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.exception.task.TaskNotFoundException;
import com.TaskPlannerApplication.mapper.taskMapper.TaskCreateDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskDetailsDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskFullUpdateDtoMapper;
import com.TaskPlannerApplication.mapper.taskMapper.TaskShortDtoMapper;
import com.TaskPlannerApplication.repository.TaskRepository;
import com.TaskPlannerApplication.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

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
    public List<TaskShortDto> getTasksByUser(UUID userId, TaskListByUserQueryParameters queryParameters) {

        List<Task> tasks = taskRepository.findByUserId(userId);
        return taskShortDtoMapper.toDtoList(tasks);
    }

    @Transactional(readOnly = true)
    public TaskDetailsDto getTaskById(UUID taskId) {
        Task task = findEntityById(taskId);
        
        if (!securityService.isUserOwner(task.getUser().getId())) {
            throw new AccessDeniedException("Access denied to this task.");
        }

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
    public void deleteTask(UUID taskId) {
        Task task = findEntityById(taskId);

        if (!securityService.isUserOwner(task.getUser().getId())) {
            throw new AccessDeniedException("You cannot delete tasks of other users.");
        }

        taskRepository.delete(task);
    }

    @Transactional(readOnly = true)
    public Task findEntityById(UUID taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + taskId));
    }
}