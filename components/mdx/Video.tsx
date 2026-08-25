type Embed = { kind: "iframe"; url: string } | { kind: "file"; url: string };

/** Turns a YouTube/Vimeo watch URL into its embed URL. Anything else is
 *  treated as a video file (e.g. /work/<slug>/demo.mp4). */
function resolve(src: string): Embed {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return { kind: "iframe", url: `https://www.youtube.com/embed${url.pathname}` };
    }

    if (host === "youtube.com" || host.endsWith(".youtube.com")) {
      if (url.pathname.startsWith("/embed/")) return { kind: "iframe", url: src };
      const id = url.searchParams.get("v");
      if (id) return { kind: "iframe", url: `https://www.youtube.com/embed/${id}` };
    }

    if (host === "vimeo.com" || host.endsWith(".vimeo.com")) {
      if (host === "player.vimeo.com") return { kind: "iframe", url: src };
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (id) return { kind: "iframe", url: `https://player.vimeo.com/video/${id}` };
    }
  } catch {
    // Not an absolute URL — fall through and treat it as a local file.
  }

  return { kind: "file", url: src };
}

export type VideoProps = {
  src: string;
  /** Describes the video for screen readers and the iframe title. */
  title?: string;
};

export default function Video({ src, title = "Video" }: VideoProps) {
  const embed = resolve(src);

  return (
    <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-surface">
      {embed.kind === "iframe" ? (
        <iframe
          src={embed.url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <video
          src={embed.url}
          controls
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
