import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, LayoutDashboard, Home, ClipboardCheck, FileText } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/intake', label: 'Get Scored', icon: ClipboardCheck },
  { to: '/results', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/whitepaper', label: 'Whitepaper', icon: FileText },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface-elevated border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-800 hover:text-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Capital Readiness – Home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <BarChart2 className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Capital Readiness
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-button text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
