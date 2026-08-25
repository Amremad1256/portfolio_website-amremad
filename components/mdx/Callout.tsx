import type { ReactNode } from "react";

export type CalloutProps = {
  title?: string;
  children?: ReactNode;
};

export default function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="my-10 rounded-2xl border border-line border-l-4 border-l-emerald bg-beige p-6">
      {title ? (
        <p className="font-display text-sm font-bold text-ink">{title}</p>
      ) : null}
      <div className={`[&>*:first-child]:mt-0 ${title ? "mt-2" : ""}`}>
        {children}
      </div>
    </aside>
  );
}
