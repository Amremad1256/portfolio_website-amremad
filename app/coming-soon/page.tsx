import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import {
  EMAIL,
  EMAIL_HREF,
  EXTERNAL_LINK_PROPS,
  LINKEDIN_URL,
  WHATSAPP_ARIA_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

const contactLinks = [
  { label: EMAIL, href: EMAIL_HREF, external: false, ariaLabel: undefined },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    external: true,
    ariaLabel: WHATSAPP_ARIA_LABEL,
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    external: true,
    ariaLabel: undefined,
  },
];

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
        {contactLinks.map(({ label, href, external, ariaLabel }, i) => (
          <Fragment key={label}>
            {i > 0 && (
              <span aria-hidden="true" className="hidden text-line sm:inline">
                &middot;
              </span>
            )}
            <a
              href={href}
              aria-label={ariaLabel}
              className="text-muted transition-colors hover:text-ink"
              {...(external ? EXTERNAL_LINK_PROPS : {})}
            >
              {label}
            </a>
          </Fragment>
        ))}
      </div>
    </main>
  );
}
