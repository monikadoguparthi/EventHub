import { Link, useLocation } from 'react-router';
import { Calendar, Home, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#1E40AF] rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1F2937]">EventHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-[#2563EB] bg-[#DBEAFE]'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/events"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/events')
                  ? 'text-[#2563EB] bg-[#DBEAFE]'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events
            </Link>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-[#2563EB] bg-[#DBEAFE]'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              My Registrations
            </Link>
          </div>

          {/* Login Button */}
          <Button
            variant="outline"
            className="border-[#2563EB] text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </nav>
  );
}
