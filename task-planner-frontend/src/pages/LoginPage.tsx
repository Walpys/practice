import { useState } from 'react';
import { useLogin } from '../hooks/auth/useAuth';
import { VALIDATION_MESSAGES, VALIDATION_RULES } from '../utils/consts/authConsts/auth.consts';
import { LoginForm } from '../components/auth/LoginForm';

import type { LoginDto } from '../model/user.types';
import { notify } from '../components/shared/Notify';

export function LoginPage() {
    const [formData, setFormData] = useState<LoginDto>({
        username: '',
        password: '',
    });

    const loginMutation = useLogin();

    const handleChange = (field: keyof LoginDto, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.username.trim().length < VALIDATION_RULES.USERNAME_MIN_LENGTH) {
            notify.error(VALIDATION_MESSAGES.USERNAME_MIN);
            return;
        }
        if (formData.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
            notify.error(VALIDATION_MESSAGES.PASSWORD_MIN);
            return;
        }

        loginMutation.mutate(formData);
    };

    return (
        <LoginForm
            formData={formData}
            onChange={handleChange}
            isPending={loginMutation.isPending}
            onSubmit={handleSubmit}
        />
    );
}

export default LoginPage;