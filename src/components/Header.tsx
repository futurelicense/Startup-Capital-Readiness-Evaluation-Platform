import React from 'react';
import { Link } from 'react-router-dom';
import { BarChartIcon, UserIcon, HomeIcon } from 'lucide-react';
const Header = () => {
  return <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChartIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                NSCR Platform
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link to="/intake" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              Get Scored
            </Link>
            <Link to="/results" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;