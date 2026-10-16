import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  ShieldAlert, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  GitPullRequest, 
  Zap,
  Globe2,
  Lock
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "01",
      title: "Attack Surface Recon",
      subtitle: "Autonomous Target Discovery",
      icon: Search,
      description: "Enter your domain or IP range. Our scanner maps your entire digital footprint including shadow IT, exposed subdomains, open ports, and unauthenticated cloud buckets.",
      badge: "Stage 1 • Reconnaissance",
      terminalOutput: [
        "[*] Initiating passive DNS enumeration for *.target-defense.net",
        "[+] Found 42 active subdomains across AWS, GCP, and Cloudflare",
        "[+] Port sweep complete: 80, 443, 8080, 9200, 27017 detected",
        "[!] Warning: Port 9200 (Elasticsearch) accessible without mTLS",
        "[✓] Asset graph constructed: 137 endpoints ready for deep inspection"
      ]
    },
    {
      id: "02",
      title: "AI Vulnerability Scanning",
      subtitle: "Deep CVE & Logic Flaw Detection",
      icon: Radar,
      description: "Deploys specialized security models to identify OWASP Top 10 vulnerabilities, zero-day CVEs, broken object level authorization (BOLA), and hardcoded secrets.",
      badge: "Stage 2 • Heuristics",
      terminalOutput: [
        "[*] Probing REST API endpoints with contextual payload fuzzing",
        "[*] Testing authentication bypass on /api/v2/admin/session",
        "[!] CRITICAL: SQL Injection verified on /api/v1/auth/query (CVE-2024-X)",
        "[!] HIGH: SSRF vulnerability identified via webhook parameter",
        "[+] Analyzed 84 npm & pip dependencies: 2 high CVEs identified"
      ]
    },
    {
      id: "03",
      title: "Exploit Verification",
      subtitle: "Zero False-Positive Validation",
      icon: ShieldAlert,
      description: "Unlike noisy legacy scanners, our engine safely verifies exploitability in sandboxed execution environments, eliminating 98% of false alerts before your team is notified.",
      badge: "Stage 3 • Sandbox Verification",
      terminalOutput: [
        "[*] Executing safe sandbox PoC for SQL Injection payload",
        "[✓] Exploitability confirmed: DB fingerprint retrieved (PostgreSQL 14.2)",
        "[-] Filtered out 14 false-positive WAF false alarms",
        "[+] CVSS 3.1 calculated score: 9.8 (Critical / Network / Low Complexity)",
        "[✓] Ready for automated patch generation and report compilation"
      ]
    },
    {
      id: "04",
      title: "Instant Remediation & CI/CD",
      subtitle: "One-Click Fixes & Pull Requests",
      icon: GitPullRequest,
      description: "Generates production-ready code patches, auto-submits GitHub Pull Requests with verified fixes, and enforces CI/CD security quality gates to prevent regressions.",
      badge: "Stage 4 • DevSecOps Defense",
      terminalOutput: [
        "[*] Synthesizing parameterized query patch for auth_controller.go",
        "[+] Generated PR #142: 'Fix: SQLi via Prepared Statements'",
        "[+] Verified CI build: All unit and regression tests passing",
        "[✓] GitHub Action pipeline passed. Quality gate verified.",
        "[🔒] Vulnerability status transitioned to REMEDIATED"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative bg-black border-t border-white/[0.05]">
      {/* Background ambient crimson glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 mb-4 tracking-wide uppercase">
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Autonomous Cyber Defense in <span className="crimson-text-gradient">4 Simple Steps</span>
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            From initial surface reconnaissance to automated code remediation, see how Vulnerability Scanner continuously shields your digital estate.
          </p>
        </div>

        {/* Interactive Steps Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#150f15] border-red-500/50 shadow-xl shadow-red-950/40'
                      : 'bg-[#0d0b12]/60 border-white/[0.06] hover:border-white/20 hover:bg-[#120f18]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive 
                        ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/40' 
                        : 'bg-neutral-900 text-neutral-400 border-white/10'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-red-400 tracking-wider">
                          STEP {step.id}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-red-400 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/30">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Terminal Visual & Step Inspector */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
              
              {/* Terminal Window Header */}
              <div className="bg-[#0b0910] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-neutral-400">
                    vuln-engine v4.2 // {steps[activeStep].badge}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-mono text-emerald-400">LIVE AGENT</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 bg-[#07060a]/90 font-mono text-xs sm:text-sm text-neutral-300 space-y-3 min-h-[340px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="text-neutral-500 border-b border-white/[0.05] pb-2 text-xs flex justify-between">
                    <span>Target: <span className="text-white">api.cloud-defense.internal</span></span>
                    <span className="text-red-400">Worker ID: worker-nyc-04</span>
                  </div>

                  {steps[activeStep].terminalOutput.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={`leading-relaxed animate-in fade-in slide-in-from-left-1 duration-300 ${
                        line.includes("CRITICAL") ? "text-red-400 font-bold bg-red-950/20 p-1 rounded" :
                        line.includes("Warning") || line.includes("HIGH") ? "text-amber-400" :
                        line.includes("REMEDIATED") || line.includes("[✓]") ? "text-emerald-400" :
                        "text-neutral-300"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Bottom Step Context Card */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span>Real-time heuristic evaluation powered by threat neural models</span>
                  </div>
                  <button 
                    onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Next Stage <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
