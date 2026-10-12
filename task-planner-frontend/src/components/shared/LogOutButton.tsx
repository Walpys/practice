import React from 'react';
import { useLogout } from '../../hooks/auth/useAuth';
export const LogoutButton: React.FC = () => {
    const logoutMutation = useLogout();

    return (
        <button
            type="button"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {logoutMutation.isPending ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-danger/30 border-t-danger" />
                    Logging out...
                </>
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log out
                </>
            )}
        </button>
    );
};

export default LogoutButton;