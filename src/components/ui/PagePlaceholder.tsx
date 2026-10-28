
import { ShieldCheck } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-[#080D18] px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-950/10 blur-[100px]" />
      </div>

      {/* Page Content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-700/30 bg-red-700/10 shadow-lg shadow-red-950/20">
          <ShieldCheck
            size={38}
            strokeWidth={1.5}
            className="text-red-500"
          />
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-red-500 sm:text-sm">
          VulnixAI
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
          {description}
        </p>

        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      </div>
    </section>
  );
}
