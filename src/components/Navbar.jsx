import React, { useState } from 'react';
import { Sparkles, Moon, ArrowRight, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Navbar({ onOpenSignIn, onOpenStartFree }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo matching the photo: asterisk/spark icon + name */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
           <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
  <img
    src={logo}
    alt="Vulnerability Scanner Logo"
    className="w-full h-full object-contain"
  />
</div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
               VULNIX AI
              </span>
              <span className="text-[10px] tracking-widest text-red-400 font-mono uppercase -mt-1 opacity-80">
                CYBER INTELLIGENCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-red-500 hover:text-red-400 transition-colors font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('sample-report')}
              className="hover:text-white transition-colors"
            >
              Sample report
            </button>
            <button
              onClick={() => scrollToSection('dashboard-demo')}
              className="hover:text-white transition-colors"
            >
              Dashboard demo
            </button>
            <button
              onClick={() => scrollToSection('start-for-free')}
              className="hover:text-white transition-colors"
            >
              Pricing
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Status indicator / theme icon */}
            <div
              title="Global Threat Shield Active"
              className="w-9 h-9 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <Moon className="w-4 h-4" />
            </div>

            {/* Sign In button */}
            <button
              onClick={onOpenSignIn}
              className="px-4 py-2 text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Sign in
            </button>

            {/* Start for free glowing crimson button */}
            <button
              onClick={onOpenStartFree}
              className="btn-crimson-glow flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white tracking-wide cursor-pointer"
            >
              <span>Start for free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09080e]/95 border-b border-neutral-800 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3 text-base">
            <button
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-red-500 font-medium py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-neutral-300 hover:text-white py-1"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('sample-report')}
              className="text-left text-neutral-300 hover:text-white py-1"
            >
              Sample report
            </button>
            <button
              onClick={() => scrollToSection('dashboard-demo')}
              className="text-left text-neutral-300 hover:text-white py-1"
            >
              Dashboard demo
            </button>
            <button
              onClick={() => scrollToSection('start-for-free')}
              className="text-left text-neutral-300 hover:text-white py-1"
            >
              Pricing
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSignIn(); }}
              className="w-full py-2.5 text-center text-sm font-medium text-neutral-200 border border-white/10 rounded-full hover:bg-white/5"
            >
              Sign in
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenStartFree(); }}
              className="w-full btn-crimson-glow py-2.5 text-center text-sm font-semibold text-white rounded-full flex items-center justify-center gap-2"
            >
              <span>Start for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
