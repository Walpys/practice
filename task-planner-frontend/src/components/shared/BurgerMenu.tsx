import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from './Button';
import type { NavItem } from '../../utils/types/NavItem';

interface MobileMenuProps {
    isOpen: boolean;
    isAuthenticated: boolean;
    navItems: readonly NavItem[];
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, isAuthenticated, navItems, onClose }: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full left-0 w-full bg-card border-b border-border shadow-lg p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-200">
            {isAuthenticated ? (
                <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={onClose}>
                            <Button variant="outline" className="w-full justify-start text-sm py-3 px-4 font-semibold">
                                {item.icon}
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </nav>
            ) : (
                <div className="flex flex-col gap-3">
                    <Link to="/register" onClick={onClose}>
                        <Button variant="fill" className="w-full justify-center text-sm py-3 px-5 font-semibold">
                            <PersonAddIcon fontSize="small" />
                            Sign Up
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};