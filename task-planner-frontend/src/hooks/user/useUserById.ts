import { useQuery } from '@tanstack/react-query';
import { userService } from '../../api/user.service';
import { userKeys } from '../../api/query.keys';

export const useUserById = (userId:string) => {
  return useQuery({
    queryKey: userKeys.byId(userId),
    queryFn: () => userService.getUserById(userId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId
  });
};