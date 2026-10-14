

export const Footer = () => {
    return (
        <footer className="w-full border-t border-border bg-card py-6 text-center text-xs text-foreground-muted">
            <div className="mx-auto max-w-7xl px-4">
                &copy; {new Date().getFullYear()} TaskPlanner. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;