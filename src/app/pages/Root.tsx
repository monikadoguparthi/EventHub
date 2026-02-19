import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { ChatBot } from '../components/ChatBot';

export function Root() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
      <ChatBot />
    </div>
  );
}
