import type { Metadata } from "next";
import Link from "next/link";
import { getAllWork } from "@/lib/work";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Selected projects across ERP implementation, AI automation, and software engineering.",
  openGraph: {
    type: "website",
    siteName: "Amr Emad",
    title: "Selected work",
    description:
      "Selected projects across ERP implementation, AI automation, and software engineering.",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected work",
    description:
      "Selected projects across ERP implementation, AI automation, and software engineering.",
  },
};

export default function Work() {
  const projects = getAllWork();

  return (
    <main className="flex-1 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Selected work
        </h1>

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-8 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
              >
                <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {project.year}
                </span>
                <span className="mt-3 font-display text-lg font-bold text-ink">
                  {project.title}
                </span>
                <span className="mt-3 leading-relaxed text-muted">
                  {project.summary}
                </span>
                <span className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
