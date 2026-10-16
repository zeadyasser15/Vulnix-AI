import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building, 
  Sparkles,
  Lock,
  Terminal,
  HelpCircle
} from 'lucide-react';

export default function StartForFree({ onOpenSignIn }) {
  const [targetDomain, setTargetDomain] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  const handleStartSubmit = (e) => {
    e.preventDefault();
    if (!targetDomain) {
      alert("Please enter a valid domain to start your free scan.");
      return;
    }
    onOpenSignIn();
  };

  const tiers = [
    {
      name: "Community",
      badge: "Free Forever",
      price: "$0",
      period: "/ forever",
      description: "Ideal for individual developers and open-source maintainers securing public repositories.",
      highlight: false,
      cta: "Get Started Free",
      features: [
        "Up to 50 automated scans / month",
        "OWASP Top 10 vulnerability checks",
        "Community threat intel feed",
        "Basic email vulnerability alerts",
        "Standard PDF audit exports",
        "1 domain monitoring"
      ]
    },
    {
      name: "Pro Shield",
      badge: "Most Popular",
      price: billingCycle === 'yearly' ? "$64" : "$79",
      period: "/ month",
      description: "For fast-growing engineering teams requiring continuous CI/CD security and automated PR fixes.",
      highlight: true,
      cta: "Start 14-Day Free Trial",
      features: [
        "Unlimited continuous scans",
        "Deep AI Heuristic & Zero-Day sweeps",
        "Automated GitHub & GitLab PR patches",
        "Asset discovery & shadow IT recon",
        "Slack & PagerDuty instant alerts",
        "Up to 15 domains & IP ranges",
        "Dedicated API key access"
      ]
    },
    {
      name: "Enterprise",
      badge: "Custom Security",
      price: "Custom",
      period: "tailored scope",
      description: "Tailored for organizations requiring on-premises execution, SAML SSO, and custom compliance frameworks.",
      highlight: false,
      cta: "Contact Security Architect",
      features: [
        "Everything in Pro Shield",
        "On-premise scanner worker nodes",
        "Custom compliance reports (SOC2, HIPAA)",
        "Dedicated Red Team simulation support",
        "SSO / SAML / Okta authentication",
        "Unlimited domains & cloud accounts",
        "99.99% Uptime SLA agreement"
      ]
    }
  ];

  return (
    <section id="start-for-free" className="py-24 relative bg-black border-t border-white/[0.05]">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[170px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 mb-4 tracking-wide uppercase">
            <span>Start For Free</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Protect Your Perimeter <span className="crimson-text-gradient">in Under 60 Seconds</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            No credit card required. Run continuous scans, detect critical vulnerabilities, and get automated pull request fixes from day one.
          </p>

          {/* Quick Domain Capture Form */}
          <form onSubmit={handleStartSubmit} className="mt-8 max-w-md mx-auto flex items-center gap-2">
            <input
              type="text"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              placeholder="e.g. acme-defense.com"
              className="flex-1 px-4 py-3 rounded-full bg-neutral-900/90 border border-white/10 focus:border-red-500 focus:outline-none text-sm text-white placeholder-neutral-500 font-mono shadow-inner"
            />
            <button
              type="submit"
              className="btn-crimson-glow flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white tracking-wide shrink-0 cursor-pointer"
            >
              <span>Scan Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Guarantee Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-400" />
              Instant 60-second setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-400" />
              SOC2 & ISO 27001 Compliant
            </span>
          </div>

          {/* Billing Switcher */}
          <div className="mt-12 inline-flex items-center p-1 rounded-full bg-neutral-900 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#181119] text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly' ? 'bg-[#181119] text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-red-600/30 text-[10px] text-red-400 font-bold">SAVE 20%</span>
            </button>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => {
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  tier.highlight
                    ? 'glass-panel border-red-500/50 shadow-2xl shadow-red-950/50 ring-1 ring-red-500/40 -translate-y-2'
                    : 'bg-[#0a0812]/70 border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Pill Badge */}
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-[11px] font-bold text-white uppercase tracking-wider shadow-lg shadow-red-600/40">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    {!tier.highlight && (
                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 mt-2 min-h-[36px] leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {tier.period}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-8 space-y-3.5 pt-6 border-t border-white/[0.08]">
                    <div className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 font-semibold">
                      Included Capabilities
                    </div>
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={onOpenSignIn}
                    className={`w-full py-3 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      tier.highlight
                        ? 'btn-crimson-glow text-white'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
