"use client";

import { motion, useReducedMotion } from "motion/react";

const links = [
  { label: "Email", href: "mailto:amr.emad.zaki.1@gmail.com" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "https://github.com/Amremad1256", external: true },
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
            {links.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
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
