import Link from "next/link";
import { CV_ARIA_LABEL, CV_FILENAME, CV_PATH } from "@/lib/cv";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-cream">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-6">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-emerald"
        >
          Amr Emad
        </Link>
        <ul className="flex items-center gap-5 text-sm sm:gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="inline-block py-2 -my-2 text-muted transition-colors hover:text-ink"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              target="_blank"
              rel="noopener"
              aria-label={CV_ARIA_LABEL}
              className="inline-block rounded-full bg-emerald px-3 py-2 font-medium text-cream transition-colors hover:bg-orange-deep sm:px-4"
            >
              {/* Short label on phones so the bar stays on one line. */}
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Download CV</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
