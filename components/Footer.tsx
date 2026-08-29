"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  EMAIL_HREF,
  GITHUB_URL,
  LINKEDIN_URL,
  WHATSAPP_ARIA_LABEL,
  WHATSAPP_URL,
} from "@/lib/contact";

const links = [
  { label: "Email", href: EMAIL_HREF },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    external: true,
    ariaLabel: WHATSAPP_ARIA_LABEL,
  },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="bg-ink px-6 py-16 text-cream sm:py-20">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Amr Emad
            </p>
            <p className="mt-2 text-sm text-cream/70">
              AI Transformation Consultant &amp; Solutions Architect
            </p>
          </div>

          <ul className="flex flex-col gap-3 text-sm">
            {links.map(({ label, href, external, ariaLabel }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={ariaLabel}
                  className="inline-block py-1 -my-1 text-cream/70 transition-colors hover:text-cream"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-cream/70">
          © 2026 Amr Emad
        </p>
      </motion.div>
    </footer>
  );
}
