import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8 max-w-7xl mx-auto w-full">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  );
}