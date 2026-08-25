import type { ReactNode } from "react";

export type SplitProps = {
  children?: ReactNode;
};

/** Two-column layout. Each direct child becomes a column; stacks on mobile. */
export default function Split({ children }: SplitProps) {
  return (
    <div className="my-10 grid gap-8 md:grid-cols-2 [&>*]:mt-0">{children}</div>
  );
}
