import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCw, 
  Activity, 
  ShieldCheck, 
  AlertOctagon, 
  Server, 
  Globe, 
  Filter, 
  Clock,
  ArrowUpRight,
  Wifi,
  Sparkles,
  CheckCircle,
  Pause
} from 'lucide-react';

export default function DashboardDemo({ onOpenStartFree }) {
  const [targetUrl, setTargetUrl] = useState('scan.acme-corp.io');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [scanStatusText, setScanStatusText] = useState('Idle - Ready to scan target perimeter');
  const [feedFilter, setFeedFilter] = useState('all');

  const defaultLogs = [
    { id: 1, time: "Just now", type: "CRITICAL", text: "Port 9200 (Elasticsearch) accessible without authentication", asset: "es-cluster.acme-corp.io", cve: "CVE-2023-3141" },
    { id: 2, time: "2m ago", type: "HIGH", text: "Outdated OpenSSL 1.1.1u with known buffer overflow vulnerability", asset: "gateway.acme-corp.io", cve: "CVE-2023-0464" },
    { id: 3, time: "5m ago", type: "MEDIUM", text: "Missing Strict-Transport-Security (HSTS) security header", asset: "app.acme-corp.io", cve: "CWE-319" },
    { id: 4, time: "11m ago", type: "SAFE", text: "TLS 1.3 handshake verified with strict elliptic curve ciphers", asset: "auth.acme-corp.io", cve: "Passed" },
    { id: 5, time: "18m ago", type: "CRITICAL", text: "Exposed environment configuration file /.env leaking DB_PASSWORD", asset: "dev-portal.acme-corp.io", cve: "CWE-552" },
  ];

  const [logs, setLogs] = useState(defaultLogs);

  const startSimulatedScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanStatusText('Step 1/5: Resolving DNS & discovering subdomains...');

    const stages = [
      { progress: 20, text: 'Step 2/5: Probing 65,535 TCP/UDP ports and service banners...' },
      { progress: 45, text: 'Step 3/5: Running OWASP Top 10 web heuristics & API fuzzing...' },
      { progress: 70, text: 'Step 4/5: Checking SSL ciphers, misconfigurations & secrets leaks...' },
      { progress: 90, text: 'Step 5/5: Simulating exploits in isolated runtime sandbox...' },
      { progress: 100, text: 'Scan Complete! 3 new vulnerabilities identified and cataloged.' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < stages.length) {
        setScanProgress(stages[current].progress);
        setScanStatusText(stages[current].text);
        current++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        // prepend a fresh log item
        const newLog = {
          id: Date.now(),
          time: "Just now",
          type: "CRITICAL",
          text: `Live vulnerability confirmed on ${targetUrl}: Insecure CORS wildcard with credentials`,
          asset: targetUrl,
          cve: "CVE-2024-8891"
        };
        setLogs(prev => [newLog, ...prev]);
      }
    }, 700);
  };

  const filteredLogs = logs.filter(log => {
    if (feedFilter === 'critical') return log.type === 'CRITICAL';
    if (feedFilter === 'safe') return log.type === 'SAFE';
    return true;
  });

  return (
    <section id="dashboard-demo" className="py-24 relative bg-black border-t border-white/[0.05]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 mb-4 tracking-wide uppercase">
            <span>Dashboard Demo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Next-Gen <span className="crimson-text-gradient">Mission Control</span> Center
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Take command with a unified cockpit. Trigger on-demand perimeter scans, track real-time exploit telemetry, and monitor security posture across all global assets.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Top Control Bar with Interactive Target Scanner */}
          <div className="bg-[#0b0912] p-6 border-b border-white/[0.08]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Live Target Scanner</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Initiate simulated real-world attack vectors against any domain
                  </p>
                </div>
              </div>

              {/* Input and Scan Trigger */}
              <div className="flex items-center gap-2 sm:w-auto w-full">
                <div className="relative flex-1 sm:w-80">
                  <Globe className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="Enter target domain (e.g. yourcompany.com)"
                    className="w-full pl-9 pr-4 py-2.5 rounded-full bg-neutral-900/90 border border-white/10 focus:border-red-500 focus:outline-none text-xs font-mono text-white placeholder-neutral-500 transition-colors"
                  />
                </div>

                <button
                  onClick={startSimulatedScan}
                  disabled={isScanning}
                  className={`btn-crimson-glow flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white tracking-wide transition-all ${
                    isScanning ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isScanning ? (
                    <>
                      <RotateCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Run Instant Scan</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Scan Progress Bar */}
            <div className="mt-5 pt-4 border-t border-white/[0.05]">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-400">{scanStatusText}</span>
                <span className="text-red-400 font-bold">{scanProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* 4 Quick Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-[#08070d]/80 border-b border-white/[0.08]">
            <div className="bg-[#120f18] p-4 rounded-2xl border border-white/[0.06]">
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Active Targets</span>
                <Server className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-2">1,428</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <span>↑ 12 added this week</span>
              </div>
            </div>

            <div className="bg-[#120f18] p-4 rounded-2xl border border-white/[0.06]">
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Critical Vulnerabilities</span>
                <AlertOctagon className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-red-400 mt-2">4 Open</div>
              <div className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <span>Requires immediate triage</span>
              </div>
            </div>

            <div className="bg-[#120f18] p-4 rounded-2xl border border-white/[0.06]">
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Remediation Speed</span>
                <Clock className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-2">14 mins</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <span>68% faster than SLA</span>
              </div>
            </div>

            <div className="bg-[#120f18] p-4 rounded-2xl border border-white/[0.06]">
              <div className="flex items-center justify-between text-neutral-400 text-xs">
                <span>Threat Defense Score</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-2">94.8%</div>
              <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                <span>Tier 1 Security Baseline</span>
              </div>
            </div>
          </div>

          {/* Real-time Threat Intelligence Feed */}
          <div className="p-6 bg-[#07060b]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-red-500 animate-pulse" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Real-Time Security Event Feed
                </h4>
              </div>

              {/* Feed Filters */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setFeedFilter('all')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    feedFilter === 'all'
                      ? 'bg-red-600/20 text-red-400 border border-red-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFeedFilter('critical')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    feedFilter === 'critical'
                      ? 'bg-red-600/20 text-red-400 border border-red-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Critical Only
                </button>
                <button
                  onClick={() => setFeedFilter('safe')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    feedFilter === 'safe'
                      ? 'bg-red-600/20 text-red-400 border border-red-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Validated Safe
                </button>
              </div>
            </div>

            {/* Event Feed Table / List */}
            <div className="divide-y divide-white/[0.05] border border-white/[0.06] rounded-2xl overflow-hidden bg-[#0c0a13]">
              {filteredLogs.map((log) => {
                const isCrit = log.type === 'CRITICAL';
                const isSafe = log.type === 'SAFE';
                const isHigh = log.type === 'HIGH';

                return (
                  <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        isCrit ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        isHigh ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        isSafe ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {log.type}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white">
                          {log.text}
                        </div>
                        <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2 mt-0.5">
                          <span>{log.asset}</span>
                          <span>•</span>
                          <span className="text-red-400">{log.cve}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-neutral-500 shrink-0 flex items-center gap-3">
                      <span>{log.time}</span>
                      <button 
                        onClick={() => alert(`Details for ${log.cve} opened`)}
                        className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                        title="Inspect telemetry"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout to Full Dashboard */}
            <div className="mt-6 text-center">
              <button
                onClick={onOpenStartFree}
                className="btn-crimson-glow inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white tracking-wide cursor-pointer"
              >
                <span>Launch Full Enterprise Dashboard</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
