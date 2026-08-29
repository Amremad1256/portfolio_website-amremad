import Link from "next/link";
import RevealText from "@/components/RevealText";

const tracks = [
  {
    title: "Commercial Strategy",
    body: "Selling and scaling software and ERP solutions — owning the commercial side from the first conversation through to a signed, deployed system.",
  },
  {
    title: "AI Automation",
    body: "Building AI workflows and automations that absorb the repetitive work, so the operation keeps moving without someone pushing it along.",
  },
  {
    title: "Engineering & QA",
    body: "Building and testing real software systems — and making sure what ships actually holds up once production traffic hits it.",
  },
];

const proofPoints = [
  "Software Engineering Degree",
  "ISTQB Certified",
  "Odoo & SAP ERP",
  "AI & Automation",
  "n8n Workflows",
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex min-h-[80vh] w-full max-w-5xl flex-col justify-center px-6 py-24 sm:py-32">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-emerald sm:text-sm">
          AI Transformation Consultant
        </p>

        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          From idea to a working system.
        </h1>

        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-muted">
          I connect commercial strategy, AI automation, and engineering —
          turning a business from idea into a working system.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/work"
            className="rounded-full bg-emerald px-6 py-3 font-medium text-cream transition-colors hover:bg-orange"
          >
            See my work
          </Link>
          <Link
            href="/contact"
            className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <section className="bg-beige px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-5xl">
          <RevealText
            text="Most businesses run on manual, disconnected work. I turn that into intelligent systems that run themselves."
            className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
          />
        </div>
      </section>

      <section className="px-6 py-32 sm:py-40">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Three tracks, one operator
          </h2>
          <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-muted">
            Three disciplines I work across — and the reason they are worth more
            together than they are apart.
          </p>

          <ul className="mt-16 grid gap-6 md:grid-cols-3">
            {tracks.map(({ title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-line bg-surface p-8 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
              >
                <h3 className="font-display text-lg font-bold text-emerald">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center font-display text-lg text-ink sm:text-xl">
            → converging into{" "}
            <span className="text-emerald">AI Transformation</span>
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Built on real experience
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="font-display text-sm font-medium text-ink sm:text-base"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-emerald px-6 py-32 text-center sm:py-40">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">
            Let&apos;s build your working system.
          </h2>
          <p className="mx-auto mt-6 max-w-[500px] text-lg leading-relaxed text-cream/90">
            Whether it&apos;s AI automation, ERP, or a product from scratch —
            let&apos;s talk about where your business could go.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-cream px-6 py-3 font-medium text-emerald transition-colors hover:bg-orange hover:text-cream"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
