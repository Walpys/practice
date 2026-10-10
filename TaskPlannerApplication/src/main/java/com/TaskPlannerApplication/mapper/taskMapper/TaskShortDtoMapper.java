package com.TaskPlannerApplication.mapper.taskMapper;

import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.task.TaskShortDto;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.mapper.Mappable;

@Component
public class TaskShortDtoMapper implements Mappable<Task, TaskShortDto> {

    @Override
    public TaskShortDto toDto(Task task) {
        if (task == null) {
            return null;
        }

        return new TaskShortDto(
            task.getId(),
            task.getTitle(),
            task.getPriority(),
            task.getStatus(),
            task.getDueDate(),
            task.getCreatedAt()
        );
    }

    @Override
    public Task toEntity(TaskShortDto dto) {
        if (dto == null) {
            return null;
        }

        Task task = new Task();
        task.setId(dto.id());
        task.setTitle(dto.title());
        task.setPriority(dto.priority());
        task.setStatus(dto.status());
        task.setDueDate(dto.dueDate());
        task.setCreatedAt(dto.createdAt());
        return task;
    }
}