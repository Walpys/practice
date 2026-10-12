import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: string | null;

  setAuth: (accessToken: string, userId: string) => void;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  accessToken: localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId'),

  setAuth: (accessToken: string, userId: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    set({
      isAuthenticated: true,
      accessToken,
      userId,
    });
  },
  setAccessToken: (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    set({ isAuthenticated: true, accessToken });
  },
  clearAuth: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    set({
      isAuthenticated: false,
      accessToken: null,
      userId: null,
    });
  },

  initAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    set({
      isAuthenticated: Boolean(accessToken),
      accessToken,
      userId,
    });
  },
}));