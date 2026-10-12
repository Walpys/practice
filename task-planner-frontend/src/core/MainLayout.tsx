import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}