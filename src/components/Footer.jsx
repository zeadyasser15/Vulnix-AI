import React from 'react';
import { Sparkles, Shield, Heart, Terminal } from 'lucide-react';

export default function Footer({ onOpenSignIn, onOpenStartFree }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/[0.08] text-neutral-400 text-xs relative overflow-hidden">
      {/* Ambient footer glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-red-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-base font-bold text-white tracking-wider uppercase">
                Vulnerability Scanner
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Empowering DevSecOps teams to discover external attack surfaces, eliminate high-risk CVEs, and automate pen-testing workflows with artificial intelligence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Scanning Clusters Operational</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sample-report')} className="hover:text-white transition-colors cursor-pointer">
                  Sample Report
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('dashboard-demo')} className="hover:text-white transition-colors cursor-pointer">
                  Dashboard Demo
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('start-for-free')} className="hover:text-white transition-colors cursor-pointer">
                  Start For Free
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Intelligence */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Threat Intel
            </h4>
            <ul className="space-y-2">
              <li><a href="#sample-report" className="hover:text-white transition-colors">CVE Database 2026</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">OWASP Top 10 Engine</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Zero-Day Sandbox</a></li>
              <li><a href="#start-for-free" className="hover:text-white transition-colors">SOC2 Compliance Reports</a></li>
            </ul>
          </div>

          {/* Platform Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Access
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSignIn} className="hover:text-white transition-colors cursor-pointer">
                  Sign In
                </button>
              </li>
              <li>
                <button onClick={onOpenStartFree} className="hover:text-white transition-colors cursor-pointer">
                  Free Tier Registration
                </button>
              </li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Documentation opening"); }} className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("CLI tool installation command copied"); }} className="hover:text-white transition-colors">CLI Runner</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Vulnerability Scanner Inc. All rights reserved. Built for mission-critical cyber defense.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300">Responsible Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
