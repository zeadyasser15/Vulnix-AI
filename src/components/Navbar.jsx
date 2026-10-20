
import React, { useState } from 'react';
import { ArrowRight, Moon, Menu, X } from 'lucide-react';
import logo from '../assets/Logo.png';

export default function Navbar({ onOpenSignIn, onOpenStartFree }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSignIn = () => {
    setMobileMenuOpen(false);
    onOpenSignIn?.();
  };

  const handleStartFree = () => {
    setMobileMenuOpen(false);
    onOpenStartFree?.();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">

          {/* Logo */}
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Vulnix AI Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <img
                src={logo}
                alt="Vulnix AI Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-[17px] font-bold tracking-wider uppercase text-white group-hover:text-red-400 transition-colors">
                VULNIX AI
              </span>

              <span className="text-[9px] tracking-widest text-red-400 font-mono uppercase -mt-0.5 opacity-80">
                CYBER INTELLIGENCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] font-medium text-neutral-300">
            <button
              onClick={scrollToTop}
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

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">

            {/* Status Indicator */}
            <div
              title="Global Threat Shield Active"
              aria-label="Global Threat Shield Active"
              className="w-8 h-8 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-red-400 transition-colors"
            >
              <Moon className="w-3.5 h-3.5" />
            </div>

            {/* Sign In */}
            <button
              onClick={handleSignIn}
              className="px-3 py-2 text-[13px] font-medium text-neutral-200 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              Sign in
            </button>

            {/* Start for Free */}
            <button
              onClick={handleStartFree}
              className="group btn-crimson-glow flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white tracking-wide cursor-pointer"
            >
              <span>Start for free</span>

              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[#09080e]/95 border-b border-neutral-800 px-5 py-5 space-y-4 backdrop-blur-xl"
        >
          <nav className="flex flex-col space-y-2.5 text-sm">
            <button
              onClick={scrollToTop}
              className="text-left text-red-500 font-medium py-1.5"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-neutral-300 hover:text-white py-1.5 transition-colors"
            >
              How it works
            </button>

            <button
              onClick={() => scrollToSection('sample-report')}
              className="text-left text-neutral-300 hover:text-white py-1.5 transition-colors"
            >
              Sample report
            </button>

            <button
              onClick={() => scrollToSection('dashboard-demo')}
              className="text-left text-neutral-300 hover:text-white py-1.5 transition-colors"
            >
              Dashboard demo
            </button>

            <button
              onClick={() => scrollToSection('start-for-free')}
              className="text-left text-neutral-300 hover:text-white py-1.5 transition-colors"
            >
              Pricing
            </button>
          </nav>

          {/* Mobile Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={handleSignIn}
              className="w-full py-2 text-center text-sm font-medium text-neutral-200 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
            >
              Sign in
            </button>

            <button
              onClick={handleStartFree}
              className="group w-full btn-crimson-glow py-2 text-center text-sm font-semibold text-white rounded-full flex items-center justify-center gap-2"
            >
              <span>Start for free</span>

              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
