# mikemaz-dev — Frontend Portfolio

A bilingual portfolio for Mikhail Mazurkevich, focused on selected frontend work, experience and
client feedback.

[Live website](https://mikemaz-portfolio.vercel.app/) ·
[Russian version](https://mikemaz-portfolio.vercel.app/ru)

## Highlights

- English and Russian pages rendered as separate routes
- Responsive editorial layout from 320px to large desktop screens
- Context-aware fixed header and fullscreen mobile navigation
- Interactive project previews and a touch-friendly reviews slider
- Accessible keyboard states and reduced-motion support
- Canonical URLs, language alternates, sitemap, robots and Person JSON-LD

## Stack

- Next.js 16 with App Router and Turbopack
- React 19 and TypeScript
- Tailwind CSS 4 with structured global CSS layers
- Lucide icons and Motion

## Project structure

```text
src/
├── app/
│   ├── (en)/            # Canonical English route
│   ├── ru/              # Russian route
│   └── styles/          # Base, sections, UI and responsive styles
├── components/portfolio # Portfolio-specific components
├── data/site-content.ts # Typed content source
└── lib/site-metadata.ts # Shared SEO metadata
```

## Local development

Node.js 20.9 or newer is required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run check
```

The command runs formatting verification, ESLint, TypeScript and the production build.

## License

Licensed under the [MIT License](LICENSE).
