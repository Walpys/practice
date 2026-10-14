import type { AuthResponseDto, LoginDto, RegisterDto } from "../model/user.types";
import { apiClient, publicApi } from "./AxiosInstance";


export const authService = {
  login: async (dto: LoginDto): Promise<AuthResponseDto> => {
    const { data } = await publicApi.post<AuthResponseDto>('/auth/login', dto);
    return data;
  },

  register: async (dto: RegisterDto): Promise<AuthResponseDto> => {
    const { data } = await publicApi.post<AuthResponseDto>('/auth/register', dto);
    return data;
  },

  refresh: async (): Promise<AuthResponseDto> => {

    const { data } = await publicApi.post<AuthResponseDto>('/auth/refresh');
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};