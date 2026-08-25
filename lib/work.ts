import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const WORK_DIR = path.join(process.cwd(), "content", "work");

/** The frontmatter every project file must define. */
export type WorkMeta = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
};

/** A project plus its body, already converted from Markdown to HTML. */
export type WorkProject = WorkMeta & {
  html: string;
};

function readProject(fileName: string): WorkProject {
  const filePath = path.join(WORK_DIR, fileName);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  const missing = ["title", "summary", "role", "year"].filter(
    (key) => typeof data[key] !== "string" || data[key].trim() === "",
  );

  if (missing.length > 0) {
    throw new Error(
      `content/work/${fileName} is missing frontmatter: ${missing.join(", ")}`,
    );
  }

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: data.title as string,
    summary: data.summary as string,
    role: data.role as string,
    year: data.year as string,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    // `async: false` pins the synchronous overload, which returns a string.
    html: marked.parse(content, { async: false }),
  };
}

function readAll(): WorkProject[] {
  if (!fs.existsSync(WORK_DIR)) return [];

  return fs
    .readdirSync(WORK_DIR)
    .filter((name) => name.endsWith(".md"))
    .map(readProject)
    .sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title));
}

/** Every project, newest year first. Used by the Work index. */
export function getAllWork(): WorkMeta[] {
  return readAll().map(({ slug, title, summary, role, year, tags }) => ({
    slug,
    title,
    summary,
    role,
    year,
    tags,
  }));
}

/** Every slug, for generateStaticParams. */
export function getAllWorkSlugs(): string[] {
  return readAll().map((project) => project.slug);
}

/** One project by slug, or undefined if no such file exists. */
export function getWorkBySlug(slug: string): WorkProject | undefined {
  return readAll().find((project) => project.slug === slug);
}
