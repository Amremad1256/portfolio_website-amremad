import type { ReactNode } from "react";

const COLUMNS = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
} as const;

export type GalleryProps = {
  children?: ReactNode;
  /** How many columns on desktop. Defaults to 2. */
  cols?: keyof typeof COLUMNS;
};

export default function Gallery({ children, cols = "2" }: GalleryProps) {
  return (
    <div
      className={`my-10 grid grid-cols-1 gap-4 ${COLUMNS[cols] ?? COLUMNS["2"]} [&_figure]:my-0`}
    >
      {children}
    </div>
  );
}
