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

A bilingual website for recruiters, collaborators and clients. A clear introduction leads into
selected projects, professional experience, learning and client reviews — with TaskHub, my favourite
ongoing project, featured on the desktop hero.

The visual language stays simple: oversized Onest typography, dark and light sections, a cobalt
accent and restrained motion.

### Inside the experience

- **Two languages, two CVs.** English at `/`, Russian at `/ru`, with a matching résumé on each page.
- **Work with context.** Project previews, live demos, source links and automatically calculated
  commercial experience.
- **Learning without clutter.** Expandable course details explain what each certificate covers.
- **Reviews that move at your pace.** Three-second autoplay with pause controls, manual navigation
  and reduced-motion support.
- **Small interaction details.** Animated navigation labels, a subtle desktop cursor accent and
  scroll-triggered reveals. Mobile keeps a simpler layout and a draggable bottom scroll control.
- **A brief loading state.** A branded transition only appears when loading takes longer; it has a
  bounded wait rather than an artificial percentage counter.

## Built with

| Layer       | Tools                                                                                 |
| ----------- | ------------------------------------------------------------------------------------- |
| Application | Next.js 16 App Router, React 19, TypeScript                                           |
| Styling     | Structured CSS, Tailwind CSS 4, Onest, Lucide icons                                   |
| Interaction | CSS transitions, IntersectionObserver, requestAnimationFrame, native browser controls |
| Quality     | Prettier, Biome, TypeScript                                                           |
| Hosting     | Vercel                                                                                |

Server Components provide the page content. Small client components handle navigation, reviews,
loading and scroll interactions. Images use Next.js image optimisation, and motion respects
`prefers-reduced-motion`.

### Search and sharing

Localised metadata, canonical URLs, language alternates, Open Graph and Twitter cards, a web
manifest and a custom 404 page are included. Structured data connects the person, website, profile,
projects and credentials.

- [Sitemap](https://mikemaz-portfolio.vercel.app/sitemap.xml)
- [Robots rules](https://mikemaz-portfolio.vercel.app/robots.txt)

Performance is a design constraint, not a fixed score: Lighthouse results depend on the build,
device, network and third-party scripts. Measure against a production build, not the development
server.

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
│   ├── styles/               # Shared styles and responsive refinements
│   ├── robots.ts             # /robots.txt
│   ├── sitemap.ts            # /sitemap.xml
│   └── manifest.ts           # App identity and icons
├── components/portfolio/     # Current website components
├── data/site-content.ts      # EN/RU copy, projects, experience, certificates and CVs
└── lib/                      # Shared metadata and supporting utilities
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
