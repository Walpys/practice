import type { PageResponse } from "../model/common.types";
import type { TaskCreateDto, TaskDetailsDto, TaskFullUpdateDto, TaskListByUserQueryParameters, TaskShortDto } from "../model/task.types";
import { apiClient } from "./AxiosInstance";

export const taskService = {
  getMyTasks: async (queryParameters: TaskListByUserQueryParameters): Promise<PageResponse<TaskShortDto>> => {
    const { data } = await apiClient.get<PageResponse<TaskShortDto>>('/tasks', {
      params: queryParameters,
    });
    return data;
  },

  createTask: async (dto: TaskCreateDto): Promise<TaskDetailsDto> => {
    const { data } = await apiClient.post<TaskDetailsDto>('/api/tasks', dto);
    return data;
  },

  getTaskById: async (taskId: string): Promise<TaskDetailsDto> => {
    const { data } = await apiClient.get<TaskDetailsDto>(`/tasks/${taskId}`);
    return data;
  },

  updateTask: async (taskId: string, dto: TaskFullUpdateDto): Promise<TaskDetailsDto> => {
    const { data } = await apiClient.put<TaskDetailsDto>(`/tasks/${taskId}`, dto);
    return data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`);
  },
};