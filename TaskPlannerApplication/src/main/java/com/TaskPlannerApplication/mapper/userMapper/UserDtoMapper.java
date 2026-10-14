package com.TaskPlannerApplication.mapper.userMapper;

import org.springframework.stereotype.Component;

import com.TaskPlannerApplication.dto.user.UserDto;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.mapper.Mappable;

@Component
public class UserDtoMapper implements Mappable<User, UserDto> {

    @Override
    public UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserDto(
            user.getId(),
            user.getUsername(),
            user.getCreatedAt()
        );
    }

    @Override
    public User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        
        User user = new User();
        user.setId(dto.id());
        user.setUserName(dto.userName());
        return user;
    }

}