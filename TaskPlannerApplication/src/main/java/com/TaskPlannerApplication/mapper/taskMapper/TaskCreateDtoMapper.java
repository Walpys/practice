package com.TaskPlannerApplication.mapper.taskMapper;


import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.task.TaskCreateDto;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.mapper.Mappable;

@Component
public class TaskCreateDtoMapper implements Mappable<Task, TaskCreateDto> {

    @Override
    public TaskCreateDto toDto(Task task) {
        if (task == null) {
            return null;
        }
        return new TaskCreateDto(
            task.getTitle(),
            task.getDescription(),
            task.getCategory(),
            task.getPriority(),
            task.getStatus(),
            task.getDueDate()
        );
    }

    @Override
    public Task toEntity(TaskCreateDto dto) {
        if (dto == null) {
            return null;
        }

        Task task = new Task();
        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setCategory(dto.category());
        task.setPriority(dto.priority());
        task.setStatus(dto.status());
        task.setDueDate(dto.dueDate());
        return task;
    }
}