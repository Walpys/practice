package com.TaskPlannerApplication.mapper.taskMapper;


import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.task.TaskFullUpdateDto;
import com.TaskPlannerApplication.entity.Task;
import com.TaskPlannerApplication.exception.mapping.MappingException;
import com.TaskPlannerApplication.mapper.Mappable;
import static com.TaskPlannerApplication.mapper.MappingHelper.updateIfPresent;
@Component
public class TaskFullUpdateDtoMapper implements Mappable<Task, TaskFullUpdateDto> {

    @Override
    public TaskFullUpdateDto toDto(Task task) {
        throw new UnsupportedOperationException("Mapping from Task to TaskFullUpdateDto is not supported.");
    }

    @Override
    public Task toEntity(TaskFullUpdateDto dto) {
        throw new UnsupportedOperationException("Mapping from TaskFullUpdateDto to Task is not supported.");
    }

    public void updateEntityFromDto(TaskFullUpdateDto dto, Task task) {
        if (dto == null || task == null) {
            throw new MappingException("DTO and Task entity must not be null.");
        }

        updateIfPresent(dto.title(), task::setTitle);
        updateIfPresent(dto.description(), task::setDescription);
        updateIfPresent(dto.category(), task::setCategory);
        updateIfPresent(dto.priority(), task::setPriority);
        updateIfPresent(dto.status(), task::setStatus);
        updateIfPresent(dto.dueDate(), task::setDueDate);
    }
}