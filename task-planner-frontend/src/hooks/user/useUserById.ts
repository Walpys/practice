import { useQuery } from '@tanstack/react-query';
import { userService } from '../../api/user.service';

export const useUserById = (userId:string|null) => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => userService.getUserById(userId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId
  });
};