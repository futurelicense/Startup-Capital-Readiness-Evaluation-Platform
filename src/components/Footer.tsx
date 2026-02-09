import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Startup Capital Readiness
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Helping startups across the United States assess and improve their
              funding readiness with AI-powered insights.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus-visible:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/intake" className="text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus-visible:underline">
                  Get Scored
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus-visible:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-slate-400 hover:text-brand-400 transition-colors focus:outline-none focus-visible:underline">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-slate-400 text-sm">
              support@capitalreadiness.org
              <br />
              123 Innovation Way
              <br />
              San Francisco, CA 94103
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} Startup Capital Readiness Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
