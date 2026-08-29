import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { getAllWorkSlugs, getWorkBySlug } from "@/lib/work";

export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      siteName: "Amr Emad",
      title: project.title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function WorkDetail({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) notFound();

  return (
    <main className="flex-1 px-6 py-24 sm:py-32">
      <article className="mx-auto max-w-5xl">
        <Link
          href="/work"
          className="font-display text-sm text-muted transition-colors hover:text-ink"
        >
          ← Back to work
        </Link>

        <h1 className="mt-8 max-w-[700px] font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 text-sm text-muted">
          {project.role} · {project.year}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[700px]">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}
