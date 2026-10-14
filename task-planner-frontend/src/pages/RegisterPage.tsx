import { useState } from 'react';
import { useRegister } from '../hooks/auth/useAuth';
import { VALIDATION_MESSAGES, VALIDATION_RULES } from '../utils/consts/authConsts/auth.consts';
import { RegisterForm, type RegisterFormValues } from '../components/auth/RegisterForm';
import { notify } from '../components/shared/Notify';

export function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormValues>({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const registerMutation = useRegister();

    const handleChange = (field: keyof RegisterFormValues, value: string) => {
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
        if (formData.password !== formData.confirmPassword) {
            notify.error('Passwords do not match');
            return;
        }

        registerMutation.mutate({
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <RegisterForm
            formData={formData}
            onChange={handleChange}
            isPending={registerMutation.isPending}
            onSubmit={handleSubmit}
        />
    );
}

export default RegisterPage;