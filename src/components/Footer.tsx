import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              National Startup Capital Readiness
            </h3>
            <p className="text-gray-300 text-sm">
              Helping startups across the United States assess and improve their
              funding readiness.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/intake" className="hover:text-blue-400">
                  Get Scored
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-blue-400">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              support@nscr-platform.org
              <br />
              123 Innovation Way
              <br />
              San Francisco, CA 94103
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} National Startup Capital Readiness
          Platform. All rights reserved.
        </div>
      </div>
    </footer>;
};
export default Footer;