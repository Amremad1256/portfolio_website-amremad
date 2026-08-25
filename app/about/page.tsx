import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Transformation Consultant & Solutions Architect bridging commercial strategy, AI automation, and software engineering.",
  openGraph: {
    type: "website",
    siteName: "Amr Emad",
    title: "About",
    description:
      "AI Transformation Consultant & Solutions Architect bridging commercial strategy, AI automation, and software engineering.",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description:
      "AI Transformation Consultant & Solutions Architect bridging commercial strategy, AI automation, and software engineering.",
  },
};

export default function About() {
  return (
    <main className="flex-1 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          About me
        </h1>

        <div className="mt-16 grid gap-12 md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-line bg-surface">
            <span className="font-display text-sm uppercase tracking-[0.2em] text-muted">
              Photo
            </span>
          </div>

          <div className="max-w-[700px]">
            <p className="text-lg leading-relaxed text-ink">
              I&apos;m an AI Transformation Consultant and Solutions Architect. Most
              people keep commercial strategy, AI automation, and software
              engineering in three separate rooms — I work across all three, so an
              idea can travel from a first business conversation to a system that
              is genuinely running.
            </p>

            <p className="mt-6 leading-relaxed text-muted">
              That comes from a Software Engineering degree, an ISTQB
              certification in software testing, and hands-on work with Odoo and
              SAP ERP — alongside building AI workflows and automations with tools
              like n8n. The testing background shapes how I build: I would rather
              find what breaks before a client does.
            </p>

            <p className="mt-6 leading-relaxed text-muted">
              What drives me is closing the gap between those worlds. Taking a
              business from idea to a working system means connecting the
              commercial, technical, and engineering sides properly, so nothing
              important gets lost in translation along the way.
            </p>

            <p className="mt-12 leading-relaxed text-muted">
              If that sounds like the problem you&apos;re sitting on, I&apos;d like to
              hear about it.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
