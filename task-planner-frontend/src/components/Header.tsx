import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useAuthStore } from '../store/useAuth.store';
import { APP_NAME, LOGO_PATH } from '../utils/consts/consts';
import { Button } from './shared/Button';

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" className="text-primary" /> },
    { label: 'Profile', path: '/cabinet', icon: <PersonIcon fontSize="small" className="text-primary" /> },
] as const;

export default function Header() {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className="flex justify-between items-center px-8 py-4 border-b sticky top-0 z-50 border-border bg-card">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-3 no-underline text-foreground">
                <div className="w-8 h-8 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                        src={LOGO_PATH}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 max-w-none object-contain"
                    />
                </div>
                <span className="font-bold text-lg text-primary">{APP_NAME}</span>
            </Link>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <nav className="flex items-center gap-4">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <Button variant="outline" className="text-sm py-2.5 px-4 font-semibold">
                                    {item.icon}
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/register">
                            <Button variant="fill" className="text-sm py-2.5 px-5 font-semibold">
                                <PersonAddIcon fontSize="small" />
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}