import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth.store";
import { authService } from "../../api/auth.service";
import { notify } from "../../components/shared/Notify";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useMutation({
        mutationFn: () => authService.logout(), 
        onSettled: async () => {
            clearAuth();

            queryClient.clear();

            notify.info('Logged out successfully');
            navigate('/login', { replace: true });
        },
    });
};