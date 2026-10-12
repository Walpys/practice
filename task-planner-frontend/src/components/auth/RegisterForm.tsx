import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '../shared/Button';

export interface RegisterFormValues {
    username: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps {
    formData: RegisterFormValues;
    onChange: (field: keyof RegisterFormValues, value: string) => void;
    isPending: boolean;
    onSubmit: (e: FormEvent) => void;
}

export function RegisterForm({
    formData,
    onChange,
    isPending,
    onSubmit,
}: RegisterFormProps) {
    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
                <p className="text-sm text-foreground-muted">Join TaskPlanner to organize your workspace</p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Username
                    </label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => onChange('username', e.target.value)}
                        placeholder="At least 3 characters"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Password
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => onChange('password', e.target.value)}
                        placeholder="At least 6 characters"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => onChange('confirmPassword', e.target.value)}
                        placeholder="Repeat your password"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                </div>

                <Button
                    type="submit"
                    variant="fill"
                    className="w-full py-3 mt-2 font-bold text-base"
                    disabled={isPending}
                >
                    <PersonAddIcon fontSize="small" />
                    {isPending ? 'Creating account...' : 'Sign Up'}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-foreground-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                    Sign In
                </Link>
            </div>
        </div>
    );
}