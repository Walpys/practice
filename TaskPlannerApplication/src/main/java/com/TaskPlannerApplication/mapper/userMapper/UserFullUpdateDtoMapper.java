package com.TaskPlannerApplication.mapper.userMapper;

import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.user.UserFullUpdateDto;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.exception.mapping.MappingException;
import com.TaskPlannerApplication.mapper.Mappable;

@Component 
public class UserFullUpdateDtoMapper implements Mappable<User, UserFullUpdateDto> {

    @Override
    public UserFullUpdateDto toDto(User user) {
        throw new UnsupportedOperationException("Mapping from User to UserFullUpdateDto is not supported.");
    }

    @Override
    public User toEntity(UserFullUpdateDto dto) {
        throw new UnsupportedOperationException("Mapping from UserFullUpdateDto to User is not supported.");
    }

    public void updateEntityFromDto(UserFullUpdateDto dto, User user) {
        if (dto == null || user == null) {
            throw new MappingException("DTO and User entity must not be null.");
        }
        user.setUserName(dto.userName());
    }

}