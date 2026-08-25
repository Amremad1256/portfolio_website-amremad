import Image from "next/image";

const RATIOS = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;

export type FigureProps = {
  src: string;
  alt?: string;
  caption?: string;
  /** Shape of the frame. Defaults to 16/9. */
  ratio?: keyof typeof RATIOS;
};

export default function Figure({
  src,
  alt = "",
  caption,
  ratio = "16/9",
}: FigureProps) {
  return (
    <figure className="my-10">
      <div
        className={`relative ${RATIOS[ratio] ?? RATIOS["16/9"]} overflow-hidden rounded-2xl border border-line bg-surface`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 700px, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
