import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col border-x border-border">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}