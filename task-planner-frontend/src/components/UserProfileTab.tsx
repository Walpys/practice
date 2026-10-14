import { useUserById } from '../hooks/user/useUserById';
import LogoutButton from './shared/LogOutButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';


interface UserProfileTabProps {
    userId: string;
}

export const UserProfileTab = ({ userId }: UserProfileTabProps) => {
    const { data: user, isLoading, isError } = useUserById(userId);

    const currentDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date());

    if (isLoading) {
        return <UserProfileSkeleton />;
    }

    if (isError) {
        return (
            <div className="flex w-full justify-center px-4 py-8">
                <div className="w-full max-w-2xl flex flex-col items-center gap-4 py-16">
                    <div className="h-16 w-16 rounded-2xl bg-danger/10 text-danger flex items-center justify-center">
                        <ErrorOutlineIcon sx={{ fontSize: 32 }} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-foreground mb-1">Failed to load profile</h3>
                        <p className="text-sm text-foreground-muted">Could not fetch user data. Please refresh the page.</p>
                    </div>
                </div>
            </div>
        );
    }

    const initials = user?.userName
        ? user.userName.slice(0, 1).toUpperCase()
        : '?';

    return (
        <div className="flex w-full justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
                <div className="mb-6 text-center">
                    <p className="mb-2 text-sm font-medium tracking-wider text-primary">
                        ACCOUNT SETTINGS
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-foreground-muted">
                        Manage your account and personal information.
                    </p>
                </div>

                <section className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
                    <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

                    <div className="relative flex flex-col items-center p-6 text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl font-bold text-primary">
                            {initials}
                        </div>

                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
                            Personal account
                        </p>

                        <h2 className="break-words text-2xl font-bold text-foreground">
                            {`Welcome, ${user?.userName || 'Guest'}!`}
                        </h2>

                        <p className="mt-2 text-sm text-foreground-muted">
                            Your personal space in TaskPlanner.
                        </p>

                        <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium text-foreground">
                                Account
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mb-4 overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="border-b border-border px-5 py-4">
                        <h3 className="font-semibold text-foreground">
                            Account information
                        </h3>

                        <p className="mt-1 text-sm text-foreground-muted">
                            Your basic account details.
                        </p>
                    </div>

                    <div className="divide-y divide-border">
                        <div className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="min-w-0 text-left">
                                <p className="text-sm font-medium text-foreground">
                                    Username
                                </p>
                                <p className="mt-1 text-xs text-foreground-muted">
                                    Display name
                                </p>
                            </div>

                            <div className="min-w-0 text-right">
                                <p className="break-words text-sm font-medium text-foreground">
                                    {user?.userName || 'Not available'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="min-w-0 text-left">
                                <p className="text-sm font-medium text-foreground">
                                    User ID
                                </p>
                                <p className="mt-1 text-xs text-foreground-muted">
                                    Unique identifier
                                </p>
                            </div>

                            <div className="min-w-0 text-right">
                                <p
                                    title={userId || 'Not available'}
                                    className="break-all font-mono text-xs text-foreground-muted"
                                >
                                    {userId || 'Not available'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 px-5 py-4">
                            <div className="min-w-0 text-left">
                                <p className="text-sm font-medium text-foreground">
                                    Current date
                                </p>
                                <p className="mt-1 text-xs text-foreground-muted">
                                    Profile overview
                                </p>
                            </div>

                            <div className="min-w-0 text-right">
                                <p className="text-sm text-foreground-muted">
                                    {currentDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flex items-center justify-between gap-4 rounded-2xl border border-danger/20 bg-danger/5 px-5 py-4">
                    <div className="min-w-0 text-left">
                        <h3 className="font-semibold text-foreground">
                            Sign out
                        </h3>

                        <p className="mt-1 text-sm text-foreground-muted">
                            End your current session.
                        </p>
                    </div>

                    <LogoutButton />
                </section>
            </div>
        </div>
    );
};


const Sk = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse rounded-xl bg-background-muted ${className}`} />
);

const UserProfileSkeleton = () => (
    <div className="flex w-full justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
            <div className="mb-6 text-center flex flex-col items-center gap-2">
                <Sk className="h-3.5 w-32" />
                <Sk className="h-8 w-40 mt-1" />
                <Sk className="h-4 w-64 mt-1" />
            </div>

            <div className="relative mb-4 overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col items-center gap-4">
                <div className="h-px absolute inset-x-0 top-0 bg-primary/40" />
                <Sk className="h-20 w-20 rounded-2xl" />
                <Sk className="h-3 w-24" />
                <Sk className="h-7 w-52" />
                <Sk className="h-4 w-40" />
                <Sk className="h-7 w-28 rounded-full" />
            </div>

            <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-5 py-4">
                    <Sk className="h-5 w-36 mb-2" />
                    <Sk className="h-4 w-48" />
                </div>
                <div className="divide-y divide-border">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 px-5 py-4">
                            <div>
                                <Sk className="h-4 w-20 mb-2" />
                                <Sk className="h-3.5 w-28" />
                            </div>
                            <Sk className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/30 bg-card px-5 py-4">
                <div>
                    <Sk className="h-4 w-16 mb-2" />
                    <Sk className="h-3.5 w-36" />
                </div>
                <Sk className="h-9 w-24 rounded-xl" />
            </div>
        </div>
    </div>
);
