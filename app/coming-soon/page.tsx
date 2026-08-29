import type { Metadata } from "next";
import Image from "next/image";

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
      {/* width/height are the displayed size (144px max), not the source's
          1254px, so Next.js serves a small image instead of the full original. */}
      <Image
        src="/logo.png"
        alt="Amr Emad logo"
        width={144}
        height={144}
        priority
        className="animate-fade-up h-28 w-28 sm:h-36 sm:w-36"
        style={{ animationDelay: "0ms" }}
      />

      <h1
        className="animate-fade-up mt-8 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        style={{ animationDelay: "90ms" }}
      >
        Amr Emad
      </h1>

      <p
        className="animate-fade-up mt-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-emerald"
        style={{ animationDelay: "180ms" }}
      >
        New portfolio launching soon.
      </p>

      <div
        className="animate-fade-up mt-12 flex flex-col items-center gap-3 border-t border-line pt-8 text-sm sm:flex-row sm:gap-6"
        style={{ animationDelay: "270ms" }}
      >
        <a
          href="mailto:amr.emad.zaki.1@gmail.com"
          className="text-muted transition-colors hover:text-ink"
        >
          amr.emad.zaki.1@gmail.com
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
