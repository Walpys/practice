import type { UserDto, UserFullUpdateDto } from "../model/user.types";
import { apiClient } from "./AxiosInstance";

export const userService = {

  getUserById: async (id: string): Promise<UserDto> => {
    const { data } = await apiClient.get<UserDto>(`/users/${id}`);
    return data;
  },

  updateUser: async (id: string, dto: UserFullUpdateDto): Promise<UserDto> => {
    const { data } = await apiClient.put<UserDto>(`/users/${id}`, dto);
    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};