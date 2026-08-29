import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Amr Emad — New portfolio launching soon",
  },
  description: "AI Transformation Consultant & Solutions Architect.",
  // Keep the placeholder out of search results so it never outranks the real
  // site once it launches.
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1
        className="animate-fade-up font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        style={{ animationDelay: "0ms" }}
      >
        Amr Emad
      </h1>

      <p
        className="animate-fade-up mt-5 max-w-[520px] text-lg leading-relaxed text-muted"
        style={{ animationDelay: "90ms" }}
      >
        AI Transformation Consultant &amp; Solutions Architect
      </p>

      <p
        className="animate-fade-up mt-10 font-display text-sm font-semibold uppercase tracking-[0.2em] text-emerald"
        style={{ animationDelay: "180ms" }}
      >
        New portfolio launching soon.
      </p>

      <div
        className="animate-fade-up mt-12 flex flex-col items-center gap-3 border-t border-line pt-8 text-sm sm:flex-row sm:gap-6"
        style={{ animationDelay: "270ms" }}
      >
        <a
          href="mailto:ae05038@gmail.com"
          className="text-muted transition-colors hover:text-ink"
        >
          ae05038@gmail.com
        </a>
        <span aria-hidden="true" className="hidden text-line sm:inline">
          &middot;
        </span>
        <a
          href="#"
          className="text-muted transition-colors hover:text-ink"
        >
          LinkedIn
        </a>
      </div>
    </main>
  );
}
