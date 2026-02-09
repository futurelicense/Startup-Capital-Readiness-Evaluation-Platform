import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Intake from './pages/Intake';
import Results from './pages/Results';
import Whitepaper from './pages/Whitepaper';

export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-surface">
        <Header />
        <main className="flex-grow min-h-0 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/results" element={<Results />} />
            <Route path="/whitepaper" element={<div className="flex-1 min-h-0 flex flex-col w-full"><Whitepaper /></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
