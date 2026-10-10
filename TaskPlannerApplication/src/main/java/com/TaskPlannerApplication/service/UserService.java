package com.TaskPlannerApplication.service;

import com.TaskPlannerApplication.dto.user.UserDto;
import com.TaskPlannerApplication.dto.user.UserFullUpdateDto;
import com.TaskPlannerApplication.entity.User;
import com.TaskPlannerApplication.exception.user.UserNotFoundException;
import com.TaskPlannerApplication.mapper.userMapper.UserDtoMapper;
import com.TaskPlannerApplication.mapper.userMapper.UserFullUpdateDtoMapper;
import com.TaskPlannerApplication.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;
    private final UserFullUpdateDtoMapper userFullUpdateDtoMapper;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    @Transactional(readOnly = true)
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return userDtoMapper.toDtoList(users);
    }

    @Transactional(readOnly = true)
    public UserDto findUserDtoById(UUID id) {
        User user = findEntityById(id);
        return userDtoMapper.toDto(user);
    }

    @Transactional(readOnly = true)
    public UserDto findUserDtoByUsername(String username) {
        User user = findEntityByUsername(username);
        return userDtoMapper.toDto(user);
    }

    @Transactional
    public UserDto updateUser(UUID id, UserFullUpdateDto userFullUpdateDto) {
        User user = findEntityById(id);

        userFullUpdateDtoMapper.updateEntityFromDto(userFullUpdateDto, user);
        
        User savedUser = userRepository.save(user);
        return userDtoMapper.toDto(savedUser);
    }

    @Transactional
    public void deleteUser(UUID id) {
        User user = findEntityById(id);
        userRepository.delete(user);
    }

    @Transactional(readOnly = true)
    public User findEntityById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public User findEntityByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }
}