# 🚀 Portfolio Site

A modern, responsive portfolio website built with the latest Next.js 15, showcasing my projects, skills, and professional experience with smooth animations and cutting-edge web technologies.

## ✨ Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Modern UI/UX** - Clean, professional design with GSAP animations
- **Project Showcase** - Interactive gallery of my best work
- **Skills Section** - Visual representation of technical skills
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Fast Performance** - Built with Next.js 15 and Turbopack for lightning-fast development
- **Type Safety** - Full TypeScript implementation
- **SEO Optimized** - Meta tags and structured data for better search visibility
- **Modern React** - Built with React 19 and latest features

## 🛠️ Tech Stack

- **Framework:** Next.js 15.2.3 (App Router + Turbopack)
- **Language:** TypeScript 5
- **Frontend:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12.6.0
- **Icons:** Lucide React
- **Utilities:** 
  - clsx & tailwind-merge for conditional styling
- **Code Quality:** ESLint + Prettier with import sorting
- **Deployment:** Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/mikemaz-dev/portfolio-site.git
cd portfolio-site
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server with Turbopack
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio/
├── app/                   # Next.js 15 app directory
│   ├── components/        # Reusable components
│   ├── lib/               # Utility functions
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # UI components
│   ├── layout/            # All sections
│   └── ui/                # Reusable UI components
├── public/                # Static assets
│   ├── images/            # Images and icons
│   └── assets/            # Other static files
└── data/                  # Static data (projects, skills, etc.)
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

The project includes:
- **ESLint** with Next.js configuration
- **Prettier** with import sorting
- **TypeScript** for type safety
- Consistent code formatting and organization

## 🚀 Performance Features

- **Turbopack** - Ultra-fast bundler for development
- **Next.js 15** - Latest optimizations and features
- **React 19** - Concurrent features and improved performance
- **Optimized animations** - GSAP for smooth 60fps animations
- **Code splitting** - Automatic optimization by Next.js

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Enjoy automatic deployments on every push!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mikemaz-dev/portfolio-site)

### Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐️ If you found this project helpful, please give it a star!
