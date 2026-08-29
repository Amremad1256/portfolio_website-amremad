# Architecture & Handover

A guide to how this site is built and how to change it safely.
Written for someone still learning to code — including future-me.

---

## 1. Overview

This is the personal portfolio site for **Amr Emad**, an AI Transformation
Consultant & Solutions Architect.

Its job is to explain one idea: that commercial strategy, AI automation, and
software engineering are usually kept in three separate rooms, and that keeping
them together is the whole point. The home page calls this **"three tracks, one
operator"** — Commercial Strategy, AI Automation, and Engineering & QA, all
converging into AI Transformation.

The site is a small marketing site with a case-study system attached. There is
no database, no login, and no backend. Everything is built into plain HTML files
ahead of time, which makes it fast, cheap to host, and hard to break.

---

## 2. Tech stack

| Technology | Version | Why it's here |
| --- | --- | --- |
| **Next.js (App Router)** | 16.3.2 | The framework. Handles pages, routing, images, and building the site. Uses the newer "App Router" style where folders become web addresses. |
| **React** | 19.2.8 | The library Next.js is built on. Lets us write pages as reusable pieces called components. |
| **TypeScript** | 5.9.3 | JavaScript with type-checking. Catches mistakes (like a missing field) before the site is built, not after it's live. |
| **Tailwind CSS** | 4.3.3 | Styling. Instead of a separate stylesheet, styles are short class names written directly on the element (`text-ink`, `px-6`). |
| **Motion** | 13.1.1 | Scroll animations. Imported from `motion/react`. This is the library formerly called Framer Motion. |
| **next-mdx-remote** | 6.0.0 | Turns the `.mdx` case-study files into real pages, so a written file can contain images and components. |
| **gray-matter** | 4.0.3 | Reads the settings block at the top of each `.mdx` file (title, year, tags). |
| **ESLint** | 9.39.5 | Checks code style and common mistakes. |
| **Turbopack** | bundled with Next | The build tool Next.js 16 uses by default. Nothing to configure. |

Fonts come from Google via Next.js's built-in font loader, so they are served
from this site rather than from Google's servers:

- **Space Grotesk** — headings and the wordmark (the "display" font)
- **Inter** — body text (the "sans" font, the default)
- **Fraunces** — a serif, currently only used for block quotes inside case studies

---

## 3. Design system

### Where the tokens live

**`app/globals.css`** — inside the `@theme { ... }` block. This is the single
source of truth for colour and type.

A "token" is just a named value. Defining `--color-emerald` once means Tailwind
automatically creates matching class names like `bg-emerald`, `text-emerald`,
and `border-emerald`.

### Colour tokens

| Token | Value | What it's for |
| --- | --- | --- |
| `--color-emerald` | `#12795A` | The primary brand green. Buttons, accents, the eyebrow line, case-study links. |
| `--color-indigo` | `#2C3E8C` | A deep blue. **Defined but not currently used anywhere.** |
| `--color-sage` | `#6E8A62` | A muted green. **Defined but not currently used anywhere.** |
| `--color-beige` | `#F1E9DB` | Warm background band. Used for the animated statement section and callout boxes. |
| `--color-cream` | `#FBF9F5` | The page background, and text on dark or green backgrounds. |
| `--color-surface` | `#FFFFFF` | Pure white. Card and panel backgrounds that need to lift off the cream. |
| `--color-ink` | `#1F1B17` | Main text colour. A warm near-black, not pure black. Also the footer background. |
| `--color-muted` | `#5B554C` | Secondary text — intros, captions, body copy inside case studies. |
| `--color-line` | `#EAE2D4` | Borders and dividers. Deliberately faint. |
| `--color-orange` | `#E8682E` | Accent used on button hover. |
| `--color-orange-deep` | `#B84A16` | A darker, accessible orange. Used for the CV button hover. |

### Font tokens

| Token | Points to | Class name | Used for |
| --- | --- | --- | --- |
| `--font-sans` | Inter | `font-sans` | Body text. This is the page default, so you rarely write it. |
| `--font-display` | Space Grotesk | `font-display` | Headings, wordmark, card titles, small uppercase labels. |
| `--font-serif` | Fraunces | `font-serif` | Block quotes in case studies. |

### Spacing rhythm

Horizontal padding is `px-6` everywhere, and the main container is `max-w-5xl`
(1024px), centred. Every page heading lines up with the wordmark in the nav
because of this.

Vertical padding follows three consistent sizes:

| Where | Padding | Why |
| --- | --- | --- |
| Page content (`/about`, `/work`, `/contact`, project pages) | `py-24 sm:py-32` | Standard page rhythm. |
| Home page bands (beige statement, three tracks, closing call-to-action) | `py-32 sm:py-40` | Home page is intentionally more spacious. |
| The proof strip on the home page | `py-12 sm:py-16` | Deliberately slim — it's a quiet divider, not a section. |

Two narrower widths exist for readability, nested *inside* the `max-w-5xl`
container so alignment is preserved:

- `max-w-[700px]` — case-study body text and the About story
- `max-w-[600px]` — intro lines and the contact method boxes

### The one styling rule

> **Always style with tokens. Never write a raw colour value.**

Write `bg-emerald`, not `bg-[#12795A]`. Write `text-muted`, not `text-gray-500`.

Two reasons. First, changing a brand colour then means editing one line instead
of hunting through thirty files. Second, Tailwind ships hundreds of its own
colours (`text-gray-500`, `bg-slate-800`) that will *work* but look subtly wrong
against this warm palette.

### The contact rule

> **Contact details live in `lib/contact.ts`. Never type an email address,
> profile URL or phone number directly into a page.**

Every way to reach you — email, WhatsApp, LinkedIn, GitHub — is defined once in
that file and imported where needed. Change it there and every page updates.

This exists because those details were originally copied into three separate
files, and the LinkedIn link stayed broken in all three for a while because
fixing one did not fix the others.

The WhatsApp number is deliberately only ever inside the link. The visible text
always reads "WhatsApp".

---

## 4. Folder & file map

```
amremad/
├── app/                         Every page lives here. Folder names become web addresses.
│   ├── layout.tsx               The outer shell: fonts, <html>/<body>, site-wide metadata.
│   ├── globals.css              Design tokens (@theme) and the page background/text defaults.
│   ├── icon.png                 Browser-tab icon. Generated by `npm run icons`.
│   ├── apple-icon.png           iPhone home-screen icon. Same generator.
│   ├── coming-soon/page.tsx     The holding page. Deliberately has no nav or footer.
│   └── (site)/                  Route group: organises files WITHOUT appearing in any URL.
│       ├── layout.tsx           Adds the nav and footer to the real site only.
│       ├── page.tsx             The home page  (/)
│       ├── about/page.tsx       The About page (/about)
│       ├── contact/page.tsx     The Contact page (/contact)
│       └── work/
│           ├── page.tsx         The Work index — the grid of project cards.
│           └── [slug]/page.tsx  One template that renders every project page.
│
├── components/                  Reusable pieces used across pages.
│   ├── Nav.tsx                  Sticky top navigation bar.
│   ├── Footer.tsx               Dark footer. Animated, so marked "use client".
│   ├── RevealText.tsx           Animates a sentence word by word. Also "use client".
│   └── mdx/                     Components you can use inside case-study files.
│       ├── index.tsx            The map: which component handles which tag, plus styling for plain headings/text.
│       ├── Figure.tsx           A single image with an optional caption.
│       ├── Gallery.tsx          A grid of images.
│       ├── Video.tsx            YouTube, Vimeo, or a local video file.
│       ├── Callout.tsx          A highlighted box for a key result.
│       └── Split.tsx            Two side-by-side columns.
│
├── content/work/                Your case studies. One .mdx file per project.
├── lib/
│   ├── work.ts                  Reads that folder, checks each file, sorts them newest first.
│   ├── cv.ts                    The CV's path and download name, in one place.
│   └── contact.ts               Email, WhatsApp, LinkedIn and GitHub links, in one place.
├── public/                      Files served exactly as-is (images, icons, the CV).
│   ├── logo.png                 Logo on a cream background. Used on the coming-soon page.
│   ├── logo-transparent.png     Transparent logo. The source for the two icons.
│   ├── amr-emad-cv.pdf          The downloadable CV. Replace this file to update it.
│   └── work/<slug>/             Images for each project.
│
├── scripts/make-icons.js        Builds the icons from the transparent logo.
├── proxy.ts                     The coming-soon gate. Runs before every page.
├── .env.local                   Your local settings. Not committed to Git.
├── .env.example                 A committed template showing which settings exist.
│
├── ARCHITECTURE.md              This document.
├── CLAUDE.md / AGENTS.md        Instructions for AI assistants working on this repo.
├── next.config.ts               Next.js settings. Currently empty — nothing needed yet.
└── package.json                 The dependency list and the npm commands.
```

**"use client" explained:** by default pages are built on the server, which is
faster. Anything that animates or reacts to the visitor needs to run in the
browser instead, and that's what the `"use client"` line at the top of a file
declares. Only two files need it: `Footer.tsx` and `RevealText.tsx`. `Nav.tsx`
does not, because a link is not interactive in that sense.

---

## 5. Pages & routes

| Address | Rendered by | What it is |
| --- | --- | --- |
| `/` | `app/(site)/page.tsx` | Home. Hero, animated statement, three tracks, proof strip, closing call-to-action. |
| `/about` | `app/(site)/about/page.tsx` | Photo placeholder plus a three-paragraph story. |
| `/work` | `app/(site)/work/page.tsx` | Grid of project cards, built from `content/work/`. |
| `/work/<slug>` | `app/(site)/work/[slug]/page.tsx` | One project. The same file serves all of them. |
| `/contact` | `app/(site)/contact/page.tsx` | Four direct contact methods, including the CV. No form. |
| `/coming-soon` | `app/coming-soon/page.tsx` | Holding page shown when the gate is on. No nav or footer. |

The square brackets in `[slug]` mean "anything goes here". The value gets passed
to the page so it knows which project to load.

The nav and footer live in `app/(site)/layout.tsx`, so every page inside the
`(site)` folder gets them automatically. The brackets around `(site)` mean it is
a **route group** — it exists to group files and never appears in a URL. That is
why `/about` is still `/about` even though the file sits in `app/(site)/about/`.

The coming-soon page sits *outside* that group, which is exactly how it gets to
be a bare full-screen page with no nav or footer.

---

## 6. The Work content system

This is the most important part of the site to understand.

### The core idea

**Adding one file creates two things.** Drop `my-project.mdx` into
`content/work/` and you automatically get:

1. A card on `/work`
2. A full page at `/work/my-project`

There is no list to update and nothing to register. Delete the file and both
disappear.

### How it actually works

1. `lib/work.ts` reads every `.mdx` file in `content/work/`.
2. `gray-matter` splits each file into its **settings block** (the part between
   the `---` lines) and its **body** (everything after).
3. It checks that `title`, `summary`, `role` and `year` are all present. If one
   is missing, **the build stops and names the file**. A typo fails loudly
   instead of quietly producing a broken page.
4. Projects are sorted by `year`, newest first.
5. `/work` uses the settings to build the cards.
6. `/work/<slug>` finds the matching file and renders its body through MDX.

### The settings block (frontmatter)

```
---
title: "Odoo ERP Rollout for a Distribution Business"
summary: "One line describing the project."
role: "Solutions Architect & Implementation Lead"
year: "2025"
tags: ["Odoo", "ERP", "Process Design"]
---
```

| Field | Required | Where it appears |
| --- | --- | --- |
| `title` | yes | Card title, page heading, browser tab, link previews |
| `summary` | yes | Card description, page description, link previews |
| `role` | yes | The "role · year" line on the project page |
| `year` | yes | Card label, the "role · year" line, and the sort order |
| `tags` | no | The small pills on the card and the project page |

Keep every value **in quotes**. `year` is text, not a number — that is
deliberate, and it is what the sorting expects.

### Naming and URLs

The filename becomes the web address:

```
content/work/sap-migration.mdx   →   /work/sap-migration
```

Use lowercase words joined by hyphens. No spaces, no capitals.

### Media convention

Each project keeps its images in its own folder, named to match:

```
public/work/sap-migration/dashboard.png
```

Reference it from the `.mdx` file by dropping the word `public`:

```
/work/sap-migration/dashboard.png
```

Anything inside `public/` is served exactly as it sits on disk.

### Available components

| Component | One-line example |
| --- | --- |
| **Figure** | `<Figure src="/work/my-project/shot.png" alt="What it shows" caption="Optional caption" />` |
| **Gallery** | `<Gallery cols="3"> …several <Figure> tags inside… </Gallery>` |
| **Video** | `<Video src="https://www.youtube.com/watch?v=ID" title="What it shows" />` |
| **Callout** | `<Callout title="Key result">Your highlighted text.</Callout>` |
| **Split** | `<Split> <div>Left column</div> <div>Right column</div> </Split>` |

Extras: `Figure` accepts `ratio="4/3"`, `"3/2"` or `"1/1"` (default `16/9`).
`Gallery` accepts `cols="2"` (default) or `"3"`. `Video` also accepts a Vimeo
link or a local file like `/work/my-project/demo.mp4` and works out which is
which on its own.

You do not have to use any of them. Plain writing — headings, paragraphs, bold,
bullet lists, links, quotes — is already styled to match the site by
`components/mdx/index.tsx`.

### One rule that will bite you

**Only use plain text in quotes for component settings.**

```
GOOD:  <Gallery cols="3">
BAD:   <Gallery cols={3}>
```

The MDX library blocks curly-brace code by default, as a security measure. When
it finds some, it **removes that setting silently** — no error, no warning, the
setting just vanishes and the component falls back to its default. Every
component here is built to take plain text so you never need braces.

---

## 7. Animations

Motion is used in exactly **two** places:

| File | What animates |
| --- | --- |
| `components/RevealText.tsx` | The beige statement on the home page. Words fade and rise one after another. |
| `components/Footer.tsx` | The whole footer fades and rises as one block. |

### The pattern

Every animation is the same three ideas:

1. **`initial`** — the from-state, how it starts (invisible, pushed down slightly)
2. **`whileInView`** — the to-state, what it becomes (visible, in place)
3. **`viewport={{ once: true }}`** — the trigger: run when it scrolls into view, and only the first time

Without `once: true` the animation would replay every time you scrolled past,
which gets irritating fast.

`RevealText` adds one extra idea: the parent holds a `staggerChildren` value, so
each word starts slightly after the one before it. That is what creates the
ripple.

### Two things already handled

**Reduced motion.** Both components check whether the visitor has switched on
"reduce motion" in their device settings. If so, content still fades in, but
nothing slides. Some people get motion sickness from sliding interfaces.

**No layout shift.** The text still occupies its full space while invisible —
only its transparency and position change, never its size. Nothing on the page
jumps as animations run.

One consequence worth knowing: the beige statement is genuinely invisible until
the browser's JavaScript loads. That is inherent to the effect, not a bug.

---

## 8. How to make common changes

### Change the logo

1. Replace `public/logo.png` (used on the coming-soon page) and/or
   `public/logo-transparent.png` (used to build the icons).
2. Run `npm run icons`. This regenerates `app/icon.png` and `app/apple-icon.png`
   from the transparent logo — trimming its empty padding, scaling the mark to
   fill the icon, and placing it on a cream background.
3. Rebuild. Browsers cache icons hard, so hard-refresh with Ctrl+Shift+R.

### Change a brand colour

1. Open `app/globals.css`.
2. Edit the hex value in the `@theme` block — e.g. `--color-emerald: #0F6B4F;`.
3. Save. Every button, link and accent updates at once.

### Add a new project

1. Copy an existing file in `content/work/` and rename it, e.g. `sap-migration.mdx`.
2. Edit the settings block at the top — title, summary, role, year, tags.
3. Put any images in `public/work/sap-migration/` and link them as `/work/sap-migration/photo.png`.
4. Save. The card and the page appear on their own.

### Add a new page

1. Create a folder in `app/` with the name you want — e.g. `app/services/`.
2. Add a `page.tsx` inside it. Copy `app/contact/page.tsx` as a starting shape.
3. Change the heading and content, and update the `metadata` block near the top.
4. To put it in the nav, add a line to the `navLinks` list at the top of `components/Nav.tsx`.

### Add a new section to the home page

1. Open `app/page.tsx`.
2. Copy an existing `<section>` block and paste it where you want it.
3. Keep the same wrapper shape: `px-6 py-32 sm:py-40` on the section, and `mx-auto max-w-5xl` on the div inside. That keeps it aligned with everything else.

### Change spacing

1. Find the `py-` number on the section — that is its vertical padding.
2. Change both values together, e.g. `py-32 sm:py-40` → `py-24 sm:py-32`. The first is the phone size, the `sm:` one takes over on wider screens.
3. Stick to the three sizes listed in section 3 so the rhythm stays consistent.

---

## 9. How to run, commit, and deploy

### Running it locally

```bash
npm install     # once, after cloning or when dependencies change
npm run dev     # start the site at http://localhost:3000
npm run build   # do a full production build — catches errors dev mode hides
npm run lint    # check code style
```

Leave `npm run dev` running while you work; it reloads as you save.

**Always run `npm run build` before pushing.** Dev mode is forgiving; the build
is not. Type errors and missing frontmatter surface here.

### A Windows/OneDrive quirk

This project sits inside a OneDrive folder. Occasionally a build fails with a
permission error mentioning `EPERM` and the `.next` folder. This is OneDrive
holding a file open while syncing — it is not your code. The fix:

```bash
rm -rf .next
npm run build
```

`.next` is a temporary build folder. It is excluded from Git and rebuilds itself.

### Git rhythm

```bash
git status                        # see what changed
git add -A                        # stage everything
git commit -m "add SAP case study"
git push
```

Commit in small, meaningful chunks — one feature or fix per commit, with a
message describing *what changed*, not "update". The remote is:

`https://github.com/Amremad1256/portfolio_website-amremad.git`

### Deployment

**Not set up yet.** The code is on GitHub but nothing is hosting it.

The intended path is Vercel (the company behind Next.js), which needs no
configuration for a project like this:

1. Sign in to vercel.com with the GitHub account.
2. Import the `portfolio_website-amremad` repository.
3. Accept the defaults and deploy.

After that, every `git push` to `main` publishes automatically, and pull
requests get their own preview link.

**One thing to do at the same time:** set an environment variable in Vercel
called `NEXT_PUBLIC_SITE_URL` to the real address (e.g. `https://amremad.com`).
Until then, link previews shared on LinkedIn or WhatsApp will point at
`localhost`. See section 10.

---

## 10. Known placeholders & TODOs

Things that are not real yet. Roughly most-important first.

### Content

- **The two sample case studies are invented.** `odoo-erp-rollout.mdx` and `n8n-quote-automation.mdx` are written to be plausible, but the projects, numbers and outcomes are made up. Replace them with real work before sharing the site.
- **`sap_migration.mdx` is a duplicate.** It is a copy of the Odoo case study, created while testing that adding a file works. Right now `/work` shows the same card twice. Either write real SAP content into it or delete the file. (Note its filename uses an underscore rather than a hyphen, so its address is `/work/sap_migration`.)
- **The About photo is an empty box** labelled "Photo" in `app/(site)/about/page.tsx`. Swap it for a real portrait.
- **The About wording is a draft** written from your notes, not by you. Read it and make it sound like you.

### Links & media

- **The case-study video is a placeholder** — a well-known joke YouTube link in `n8n-quote-automation.mdx`. Swap it before anyone sees it.
- **The project images are generated placeholders** — plain coloured blocks in `public/work/`. Replace with real screenshots.
- **The CV is a placeholder.** `public/amr-emad-cv.pdf` is a one-page stand-in. Replace that exact file — same folder, same name — and both CV links pick it up with no code change.

### Setup

- **`NEXT_PUBLIC_SITE_URL` is not set**, so the site currently reports its address as `http://localhost:3000`. Set it when deploying, or link previews will be broken.
- **There is no link preview image.** Sharing a link gives text only. Next.js can generate one automatically from your name and title — worth adding before promoting the site.
- **`README.md` is still the Next.js starter text.** It talks about a Geist font this site does not use. Worth replacing with a short description of the project.
- **Five unused starter graphics** sit in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`). Nothing references them; safe to delete.

### Design decisions left open

- **Two colour tokens are defined but unused:** `--color-indigo` and `--color-sage`. Keep them if you have plans; otherwise they are harmless.
- **Button hover contrast is below the accessibility standard.** Buttons switch to `--color-orange` on hover, which gives cream text a contrast ratio of about 3.1 to 1 against the 4.5 minimum. Switching those hovers to `--color-orange-deep` scores about 5.0 and keeps the same look. This affects the home page hero button and the closing call-to-action button.
- **Keyboard focus outlines are the browser defaults** — functional, but a plain blue ring that clashes with the palette. Worth styling before launch.
- **The site has never been checked in a real browser at phone width** by the assistant that built it. The code has no fixed widths that should overflow, but a visual pass on a real device is still worth doing.

---

## 11. Coming-soon mode

The whole site can be hidden behind a holding page with a single setting. The
real site is not deleted or disabled — it sits untouched behind the gate and
comes back the moment you switch it off.

### The switch

One setting controls everything: **`NEXT_PUBLIC_COMING_SOON`**

| Value | What visitors see |
| --- | --- |
| `true` | Every address redirects to the holding page. |
| `false` | The real site, exactly as normal. |
| not set at all | The real site. Same as `false`. |

Only the exact word `true` turns the gate on. Anything else leaves the site
live, so a typo fails safe.

### How it works

`proxy.ts` at the project root runs before any page is served. If the gate is
on, it sends visitors to `/coming-soon`. It deliberately does **not** touch the
holding page itself, the stylesheets and scripts, the site icons, or files with
an extension such as the CV — otherwise the holding page would load with no
styling.

> **Note on the filename.** This used to be called `middleware.ts`. Next.js 16
> renamed the convention to `proxy.ts`. Same behaviour, new name. Guides written
> for older Next.js versions will say `middleware.ts`.

### Testing it locally

Edit `.env.local`, then **restart `npm run dev`** — this setting is read when
the server starts, so a save alone will not do it.

```
NEXT_PUBLIC_COMING_SOON=true    # see the holding page
NEXT_PUBLIC_COMING_SOON=false   # see the real site
```

`.env.local` is not committed to Git, so your local setting stays yours.
`.env.example` *is* committed and lists which settings exist.

### On Vercel

Set it under **Project → Settings → Environment Variables**, named
`NEXT_PUBLIC_COMING_SOON` with the value `true`.

**Important:** settings whose names start with `NEXT_PUBLIC_` are baked in when
the site is built, not read fresh on each visit. So changing the value is only
half the job — **you must redeploy** for it to take effect. Vercel offers this
straight after you save the change.

### Going live

1. Vercel → Settings → Environment Variables.
2. Change `NEXT_PUBLIC_COMING_SOON` from `true` to `false` (or delete it).
3. Redeploy.

That is the whole launch. Nothing else changes, and it is reversible the same
way if you need to pull the site back behind the gate.
