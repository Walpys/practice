export interface UserDto {
  id: string;
  userName: string;
  createdAt: string;
}

export interface UserFullUpdateDto {
  userName: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {}

export interface AuthResponseDto {
  accessToken: string;
  userId: string;
  refreshToken: string;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}