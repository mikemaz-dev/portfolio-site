<p align="center">
  <img src="public/logos/mikemaz-dev-icon-192.png" width="80" height="80" alt="mikemaz-dev monogram" />
</p>

<h1 align="center">mikemaz-dev</h1>

<p align="center">
  The personal portfolio of Mikhail Mazurkevich.<br />
  Frontend development · Selected projects · Real client feedback
</p>

<p align="center">
  <a href="https://mikemaz-portfolio.vercel.app/">Explore in English</a> ·
  <a href="https://mikemaz-portfolio.vercel.app/ru">Смотреть на русском</a> ·
  <a href="https://www.linkedin.com/in/mike-mazurkevich/">LinkedIn</a>
</p>

---

## A portfolio built around the work

A bilingual website for recruiters, collaborators and clients. A short introduction leads into
selected projects, work experience, an award, learning and client reviews.

The look is a calm studio: a soft lavender canvas, black Onest typography, rounded black panels and
a single electric-blue accent. Motion is there to make the page feel alive, never to slow it down.

### Inside the experience

- **A living dot field.** The hero and the award panel sit on a canvas of dots on springs. The
  pointer or a finger pushes them aside, moving dots stretch into short tails, and a click or tap
  sends a ripple through the field.
- **An optional soundtrack.** A generative ambient score built with the Web Audio API — no audio
  files. Pads and soft bells play on request, clicks on the field ring as chimes, and the dots
  breathe with the bass. A small panel controls the volume, which is remembered between visits.
- **Two languages, two CVs.** English at `/`, Russian at `/ru`, with a matching résumé on each page.
- **Work with context.** Project previews, live demos, source links, the TaskHub release and the
  third place at the ПАТРИОТ.by competition, all reachable from the first screen.
- **Small details.** The role in the hero is "selected" on load with iOS-style handles, list markers
  turn as rows scroll in, the award headline splits apart on scroll, and the footer wordmark grows
  heavier under the cursor thanks to the variable font.
- **Accessible by default.** Keyboard navigation, a skip link, labelled controls, and every
  animation turns off with `prefers-reduced-motion`.

## Built with

| Layer       | Tools                                                                        |
| ----------- | ---------------------------------------------------------------------------- |
| Application | Next.js 16 App Router, React 19, TypeScript                                  |
| Styling     | Tailwind CSS 4 (theme tokens and keyframes in `globals.css`), Onest, Lucide  |
| Interaction | Canvas 2D, Web Audio API, CSS scroll-driven animations, IntersectionObserver |
| Quality     | Prettier, Biome, TypeScript                                                  |
| Hosting     | Vercel                                                                       |

Server Components render the content. Small client components handle the header, the dot field,
sound, reviews and scroll interactions. The audio engine loads only after the visitor turns sound
on.

### Performance

The page scores 100 for Lighthouse performance on mobile and desktop against a production build. The
stylesheet is inlined, analytics load when the browser is idle, the dot field starts after the first
paint, draws in batches, halves its frame rate when nobody interacts and pauses off screen. Measure
against `npm run build && npm run start`, not the development server.

### Search and sharing

Localised metadata, canonical URLs, language alternates, Open Graph and Twitter cards, a web
manifest and a custom 404 page are included. Structured data connects the person, website, profile,
projects and credentials.

- [Sitemap](https://mikemaz-portfolio.vercel.app/sitemap.xml)
- [Robots rules](https://mikemaz-portfolio.vercel.app/robots.txt)

## Run locally

Use **Node.js 22.x** and npm. The lockfile is committed for reproducible dependency installation.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) or [localhost:3000/ru](http://localhost:3000/ru).

For a production build:

```bash
npm run build
npm run start
```

### Quality checks

```bash
npm run check
```

Runs formatting verification, Biome lint, TypeScript and the production build. Each step can also
run independently:

```bash
npm run format:check
npm run lint
npm run typecheck
```

To build with Webpack explicitly, use `npm run build -- --webpack`.

## Find your way around

```text
src/
├── app/
│   ├── (en)/                 # English page and layout
│   ├── ru/                   # Russian page and layout
│   ├── globals.css           # Tailwind theme: colours, easing, keyframes, reveal rules
│   ├── robots.ts             # /robots.txt
│   ├── sitemap.ts            # /sitemap.xml
│   └── manifest.ts           # App identity and icons
├── components/portfolio/     # Current website components (DotField, SoundToggle, …)
├── data/site-content.ts      # EN/RU copy, projects, experience, certificates and CVs
└── lib/                      # Metadata, the ambient audio engine and the audio bus
public/
├── logos/                    # Brand assets and app icons
└── wip_screen/               # Project previews
```

The current App Router site uses `components/portfolio`. Older layout and UI components remain in
the repository but are outside the active site's lint and TypeScript scope.

## Contact

Have a project or a frontend role in mind? Get in touch on [Telegram](https://t.me/mazdev_14) or
[LinkedIn](https://www.linkedin.com/in/mike-mazurkevich/).

Licensed under the [MIT License](LICENSE).
