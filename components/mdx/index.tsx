import type { MDXComponents } from "mdx/types";
import Callout from "./Callout";
import Figure from "./Figure";
import Gallery from "./Gallery";
import Split from "./Split";
import Video from "./Video";

/**
 * Everything available inside a .mdx case study: the custom components, plus
 * token-styled versions of the plain-markdown elements so a case study with no
 * components at all still matches the site.
 */
export const mdxComponents: MDXComponents = {
  Callout,
  Figure,
  Gallery,
  Split,
  Video,

  h2: (props) => (
    <h2
      className="mt-12 font-display text-xl font-bold tracking-tight text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-display text-lg font-bold text-ink" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc pl-5" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal pl-5" {...props} />,
  li: (props) => <li className="mt-2 leading-relaxed text-muted" {...props} />,
  a: (props) => (
    <a
      className="text-emerald underline decoration-line underline-offset-4 transition-colors hover:decoration-emerald"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-4 border-line pl-5 font-serif text-lg italic text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
  img: (props) => (
    <Figure src={String(props.src ?? "")} alt={props.alt ?? ""} />
  ),
};
