import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAuthStore } from '../store/useAuth.store';
import { APP_NAME, LOGO_PATH } from '../utils/consts/consts';
import { Button } from './shared/Button';
import { MobileMenu } from './shared/BurgerMenu';

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" className="text-primary" /> },
    { label: 'Profile', path: '/cabinet', icon: <PersonIcon fontSize="small" className="text-primary" /> },
] as const;

export default function Header() {
    const { isAuthenticated } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="flex justify-between items-center px-6 md:px-8 py-3.5 border-b sticky top-0 z-50 border-border bg-card">
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-3.5 no-underline text-foreground group">
                <div className="w-11 h-11 shrink-0 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                    <img
                        src={LOGO_PATH}
                        alt="Logo"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain"
                    />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-primary">
                    {APP_NAME}
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
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

            <div className="flex md:hidden items-center">
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-xl text-foreground hover:bg-background transition-colors focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
                
            </div>
            <MobileMenu
                isOpen={mobileMenuOpen}
                isAuthenticated={isAuthenticated}
                navItems={NAV_ITEMS}
                onClose={closeMobileMenu}
            />
        </header>
    );
}