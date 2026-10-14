import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import Button from '../shared/Button';
import type { LoginDto } from '../../model/user.types';

interface LoginFormProps {
    formData: LoginDto;
    onChange: (field: keyof LoginDto, value: string) => void;
    isPending: boolean;
    onSubmit: (e: FormEvent) => void;
}

export function LoginForm({
    formData,
    onChange,
    isPending,
    onSubmit,
}: LoginFormProps) {
    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
                <p className="text-sm text-foreground-muted">Sign in to your TaskPlanner account</p>
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
                        placeholder="Enter your username"
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
                        placeholder="••••••••"
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
                    <LoginIcon fontSize="small" />
                    {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-foreground-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}