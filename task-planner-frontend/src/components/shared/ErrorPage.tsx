import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import LockIcon from '@mui/icons-material/Lock';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface ErrorPageProps {
    statusCode?: number;
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export interface ErrorDisplayConfig {
    icon: React.ReactNode;
    title: string;
    message: string;
    color: string;
}

export const ERROR_CONFIGS: Record<number, ErrorDisplayConfig> = {
    404: {
        icon: <SearchOffIcon sx={{ fontSize: 56 }} />,
        title: 'Page Not Found',
        message: "The page you're looking for doesn't exist or has been moved.",
        color: 'text-primary',
    },
    401: {
        icon: <LockIcon sx={{ fontSize: 56 }} />,
        title: 'Unauthorized',
        message: 'You need to be logged in to access this resource.',
        color: 'text-warning',
    },
    403: {
        icon: <LockIcon sx={{ fontSize: 56 }} />,
        title: 'Forbidden',
        message: "You don't have permission to access this page.",
        color: 'text-warning',
    },
    500: {
        icon: <ErrorOutlineIcon sx={{ fontSize: 56 }} />,
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        color: 'text-danger',
    },
    503: {
        icon: <WifiOffIcon sx={{ fontSize: 56 }} />,
        title: 'Service Unavailable',
        message: 'The service is temporarily unavailable. Please try again in a moment.',
        color: 'text-danger',
    },
};

const PARTICLES = Array.from({ length: 18 }, (_, i) => i);

export const ErrorDisplay = ({
    statusCode = 500,
    title,
    message,
    onRetry,
}: {
    statusCode?: number;
    title?: string;
    message?: string;
    onRetry?: () => void;
}) => {
    const navigate = useNavigate();

    const config = ERROR_CONFIGS[statusCode] ?? {
        icon: <ErrorOutlineIcon sx={{ fontSize: 56 }} />,
        title: 'Unexpected Error',
        message: 'Something went wrong. Please try again.',
        color: 'text-danger',
    };

    const displayTitle = title || config.title;
    const displayMessage = message || config.message;

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-danger/5 blur-[100px]" />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {PARTICLES.map((i) => (
                    <span
                        key={i}
                        className="absolute block rounded-full bg-primary/10"
                        style={{
                            width: `${4 + (i % 5) * 3}px`,
                            height: `${4 + (i % 5) * 3}px`,
                            left: `${(i * 17 + 5) % 95}%`,
                            top: `${(i * 23 + 10) % 90}%`,
                            animation: `float-particle ${4 + (i % 4)}s ease-in-out infinite`,
                            animationDelay: `${(i * 0.4) % 3}s`,
                            opacity: 0.4 + (i % 3) * 0.15,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
                <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-danger animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
                        Error {statusCode}
                    </span>
                </div>

                <div className={`mb-6 ${config.color} opacity-90`}>
                    {config.icon}
                </div>

                <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                    {displayTitle}
                </h1>

                <p className="mb-10 text-sm text-foreground-muted leading-relaxed max-w-sm">
                    {displayMessage}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background shadow-lg shadow-primary/20 transition-all hover:bg-primary-hover hover:shadow-primary/30 active:scale-95"
                    >
                        <HomeIcon sx={{ fontSize: 18 }} />
                        Go to Dashboard
                    </button>

                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-background-muted active:scale-95"
                        >
                            <RefreshIcon sx={{ fontSize: 18 }} />
                            Try Again
                        </button>
                    )}

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-background-muted active:scale-95"
                    >
                        ← Go Back
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes float-particle {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
                    50% { transform: translateY(-18px) scale(1.15); opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};

export const RouteErrorPage = () => {
    const routeError = useRouteError();

    let statusCode = 500;
    let title: string | undefined;
    let message: string | undefined;

    if (isRouteErrorResponse(routeError)) {
        statusCode = routeError.status;
        title = routeError.statusText || undefined;
        message = typeof routeError.data === 'string' ? routeError.data : undefined;
    }

    return <ErrorDisplay statusCode={statusCode} title={title} message={message} />;
};

export const ErrorPage = ({ statusCode = 500, title, message, onRetry }: ErrorPageProps) => (
    <ErrorDisplay statusCode={statusCode} title={title} message={message} onRetry={onRetry} />
);

export default ErrorPage;
