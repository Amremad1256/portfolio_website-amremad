import type { Metadata } from "next";
import { CV_ARIA_LABEL, CV_FILENAME, CV_PATH } from "@/lib/cv";
import {
  EMAIL,
  EMAIL_HREF,
  GITHUB_LABEL,
  GITHUB_URL,
  LINKEDIN_URL,
  WHATSAPP_ARIA_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about AI automation, ERP, or building a product from scratch.",
  openGraph: {
    type: "website",
    siteName: "Amr Emad",
    title: "Contact",
    description:
      "Get in touch about AI automation, ERP, or building a product from scratch.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Get in touch about AI automation, ERP, or building a product from scratch.",
  },
};

type Method = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: string;
  ariaLabel?: string;
};

const methods: Method[] = [
  {
    label: "Email",
    value: EMAIL,
    href: EMAIL_HREF,
  },
  {
    // The phone number stays inside the link — only "WhatsApp" is shown.
    label: "WhatsApp",
    value: "Start a chat",
    href: WHATSAPP_URL,
    external: true,
    ariaLabel: WHATSAPP_ARIA_LABEL,
  },
  {
    label: "LinkedIn",
    value: "View profile",
    href: LINKEDIN_URL,
    external: true,
  },
  {
    label: "GitHub",
    value: GITHUB_LABEL,
    href: GITHUB_URL,
    external: true,
  },
  {
    label: "CV",
    value: "Download PDF",
    href: CV_PATH,
    external: true,
    download: CV_FILENAME,
    ariaLabel: CV_ARIA_LABEL,
  },
];

export default function Contact() {
  return (
    <main className="flex-1 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          Let&apos;s talk
        </h1>

        <p className="mt-6 max-w-[600px] text-lg leading-relaxed text-muted">
          Tell me about your business or project — I usually reply within a day.
        </p>

        <ul className="mt-12 flex max-w-[600px] flex-col gap-4">
          {methods.map(({ label, value, href, external, download, ariaLabel }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={ariaLabel}
                className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-emerald"
                {...(download ? { download } : {})}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span>
                  <span className="block font-display text-sm font-bold text-ink">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{value}</span>
                </span>
                <span aria-hidden="true" className="text-muted">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
