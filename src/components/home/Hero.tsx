import { Matrix } from "react-patternify";

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0a0505]">
      {/* Matrix Background */}
      <Matrix
        contained
        bg="#0a0505"
        color="#A82A2A"
        headColor="#ffbebe"
        fontSize={14}
        speed={12}
        density={0.5}
        trailLength={25}
        charset="01"
      />

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2">
       
      </div>
      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          AI-Powered Security
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Find Vulnerabilities.
          <span className="block text-red-500">Secure Your Code.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
          Scan your code with AI-powered vulnerability detection and get
          actionable security insights.
        </p>

        <button className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500">
          Start Scanning
        </button>
      </div>
    </section>
  );
}
