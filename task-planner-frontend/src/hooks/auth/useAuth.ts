import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/auth.service';
import { useAuthStore } from '../../store/useAuth.store';
import { notify } from '../../components/shared/Notify';
import type { LoginDto, RegisterDto } from '../../model/user.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (dto: LoginDto) => authService.login(dto),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.userId); 
      notify.success('Successfully logged in!');
      navigate('/cabinet', { replace: true });
    },
    onError: () => {
      notify.error('Invalid username or password');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (dto: RegisterDto) => authService.register(dto),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.userId); 
      notify.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      notify.error('Registration failed. Username might be taken.');
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      notify.info('Logged out successfully');
    },
    onError: () => {
      notify.info('Logged out');
    },
    onSettled: () => {
      clearAuth();
      navigate('/login');
    },
  });
};