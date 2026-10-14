package com.TaskPlannerApplication.mapper.taskMapper;

import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.task.TaskDetailsDto;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.mapper.Mappable;

@Component
public class TaskDetailsDtoMapper implements Mappable<Task, TaskDetailsDto> {

    @Override
    public TaskDetailsDto toDto(Task task) {
        if (task == null) {
            return null;
        }

        return new TaskDetailsDto(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getCategory(),
            task.getPriority(),
            task.getStatus(),
            task.getDueDate(),
            task.getCreatedAt()
        );
    }

    @Override
    public Task toEntity(TaskDetailsDto dto) {
        if (dto == null) {
            return null;
        }

        Task task = new Task();
        task.setId(dto.id());
        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setCategory(dto.category());
        task.setPriority(dto.priority());
        task.setStatus(dto.status());
        task.setDueDate(dto.dueDate());
        task.setCreatedAt(dto.createdAt());
        return task;
    }
}