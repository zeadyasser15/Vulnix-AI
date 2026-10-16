import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SampleReport from './components/SampleReport';
import DashboardDemo from './components/DashboardDemo';
import StartForFree from './components/StartForFree';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import { HackerBackground } from './components/HackerBackground';

export default function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInTab, setSignInTab] = useState('signin');

  const handleOpenSignIn = () => {
    setSignInTab('signin');
    setSignInOpen(true);
  };

  const handleOpenStartFree = () => {
    setSignInTab('register');
    setSignInOpen(true);
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById('dashboard-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col selection:bg-red-600/30 selection:text-red-200 overflow-x-hidden">
      {/* Global Ambient Hacker Background with soft vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <HackerBackground
          color="#ef4444"
          highlightColor="#ffffff"
          fontSize={13}
          speed={1.2}
          fadeAlpha={0.06}
          className="opacity-50"
        />
        {/* Soft radial vignette ensuring content focus and readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_90%)]" />
      </div>

      {/* Navigation bar with links and action buttons */}
      <Navbar 
        onOpenSignIn={handleOpenSignIn}
        onOpenStartFree={handleOpenStartFree}
      />

      {/* Hero Section matching the photo */}
      <main className="flex-1">
        <Hero 
          onStartFree={handleOpenStartFree}
          onExploreFeatures={handleExploreFeatures}
        />

        {/* Section 1: How it works */}
        <HowItWorks />

        {/* Section 2: Sample report */}
        <SampleReport />

        {/* Section 3: Dashboard demo */}
        <DashboardDemo 
          onOpenStartFree={handleOpenStartFree}
        />

        {/* Section 4: Start for free */}
        <StartForFree 
          onOpenSignIn={handleOpenSignIn}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenSignIn={handleOpenSignIn}
        onOpenStartFree={handleOpenStartFree}
      />

      {/* Sign In & Registration Modal */}
      <SignInModal 
        isOpen={signInOpen}
        initialTab={signInTab}
        onClose={() => setSignInOpen(false)}
      />
    </div>
  );
}
