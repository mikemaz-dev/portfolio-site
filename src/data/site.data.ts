export type ProjectCase = {
	slug: string
	title: string
	kind: string
	summary: string
	problem: string
	solution: string
	result: string
	techs: string[]
	preview: string
	liveUrl?: string
	githubUrl?: string
	isPrivate?: boolean
}

export type ServiceItem = {
	title: string
	description: string
	deliverables: string[]
	ctaLabel: string
}

export type Testimonial = {
	quote: string
	authorName: string
	authorRole: string
	companyLabel?: string
	isAnonymized?: boolean
}

export const CONTACTS = {
	email: 'mazurkevich.mikhail.14@gmail.com',
	telegram: 'https://t.me/mikemaz_dev',
	github: 'https://github.com/mikemaz-dev',
	kwork: 'https://kwork.ru/user/mazdev'
} as const

export const NAV_ITEMS = [
	{ name: 'Home', href: '/#home' },
	{ name: 'Services', href: '/#services' },
	{ name: 'Projects', href: '/#projects' },
	{ name: 'About', href: '/#about' },
	{ name: 'FAQ', href: '/#faq' },
	{ name: 'Contact', href: '/#contact' }
] as const

export const SERVICES: ServiceItem[] = [
	{
		title: 'Website development',
		description: 'Clean, responsive websites from design or rough idea to a polished launch.',
		deliverables: ['Responsive layout', 'Fast loading pages', 'SEO-ready structure'],
		ctaLabel: "Let's talk"
	},
	{
		title: 'Landing pages',
		description: 'Focused pages for products, services, launches, and lead generation.',
		deliverables: ['Conversion-focused sections', 'Clear CTA flow', 'Mobile-first UI'],
		ctaLabel: "Let's talk"
	},
	{
		title: 'Web products frontend',
		description: 'Frontend for dashboards, SaaS tools, personal products, and client portals.',
		deliverables: ['React / Next.js UI', 'Forms and state', 'API integration'],
		ctaLabel: "Let's talk"
	},
	{
		title: 'WordPress websites',
		description:
			'WordPress pages and business websites for clients who need an easy content workflow.',
		deliverables: ['WordPress setup', 'Theme customization', 'Content-friendly pages'],
		ctaLabel: "Let's talk"
	},
	{
		title: 'UI polish and optimization',
		description: 'Improve an existing interface so it feels faster, cleaner, and easier to use.',
		deliverables: ['UI refactoring', 'Performance pass', 'Accessibility basics'],
		ctaLabel: "Let's talk"
	}
]

export const TECH_GROUPS = [
	{
		title: 'Core frontend',
		items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js']
	},
	{
		title: 'Styling and UI',
		items: ['Tailwind', 'Sass', 'Shadcn/ui', 'Motion', 'Responsive design']
	},
	{
		title: 'Product logic',
		items: ['Zustand', 'React Redux', 'React Hook Form', 'Zod', 'NextAuth.js']
	},
	{
		title: 'Tooling',
		items: ['Supabase', 'Prisma', 'PostgreSQL', 'WordPress', 'ESLint', 'Prettier']
	}
] as const

export const PROJECT_CASES: ProjectCase[] = [
	{
		slug: 'taskhub',
		title: 'TaskHub',
		kind: 'Productivity web app',
		summary: 'A modern task management platform with a polished dashboard experience.',
		problem:
			'The product needed a clear interface for organizing work without making the flow feel heavy.',
		solution:
			'Built a responsive Next.js interface with structured screens, reusable UI patterns, and smooth product interactions.',
		result:
			'A portfolio-ready SaaS-style product that demonstrates dashboard thinking, application structure, and frontend polish.',
		techs: ['Next.js', 'TypeScript', 'Tailwind', 'React Hook Form', 'Zod', 'Zustand'],
		preview: '/wip_screen/taskhub.png',
		liveUrl: 'https://taskhub-green.vercel.app/',
		githubUrl: 'https://github.com/mikemaz-dev/taskhub'
	},
	{
		slug: 'next-pizza',
		title: 'NextPizza',
		kind: 'Full-stack commerce app',
		summary: 'A pizza delivery app with product browsing, ordering flow, and account logic.',
		problem:
			'The interface had to make a multi-step ordering experience feel simple on desktop and mobile.',
		solution:
			'Created product pages, cart flow, authentication-aware UI, and a clean commerce layout with Next.js.',
		result:
			'A complete commerce-style project showing full product flow, frontend architecture, and user journey thinking.',
		techs: ['Next.js', 'TypeScript', 'Tailwind', 'NextAuth.js', 'Prisma', 'React Hook Form'],
		preview: '/wip_screen/next-pizza.png',
		liveUrl: 'https://next-pizza-7zt4-nine.vercel.app/',
		githubUrl: 'https://github.com/mikemaz-dev/next-pizza'
	},
	{
		slug: 'justbank',
		title: 'JustBank',
		kind: 'Finance interface',
		summary: 'A banking interface with transactions, statistics, and account operations.',
		problem: 'Financial screens need to stay readable, trustworthy, and easy to scan.',
		solution:
			'Designed a restrained interface with clear data blocks, account actions, and responsive transaction views.',
		result:
			'A polished UI case that shows attention to complex layouts, information hierarchy, and product clarity.',
		techs: ['React.js', 'JavaScript', 'CSS', 'API integration'],
		preview: '/wip_screen/justbank.png',
		liveUrl: 'https://justbank.vercel.app/',
		githubUrl: 'https://github.com/mikemaz-dev/justbank'
	},
	{
		slug: 'embrace-agency',
		title: 'Embrace Agency',
		kind: 'Landing page',
		summary: 'A stylish one-page agency website focused on presentation and responsive layout.',
		problem:
			'The page needed to communicate an agency offer quickly and look credible across screen sizes.',
		solution:
			'Built a crisp landing page with structured content sections, strong spacing, and mobile-first layout.',
		result:
			'A lightweight marketing site case that fits landing-page and small business client requests.',
		techs: ['HTML', 'CSS', 'JavaScript', 'Responsive layout'],
		preview: '/wip_screen/embrace.png',
		liveUrl: 'https://mikemaz-dev.github.io/Embrace-Agency/',
		githubUrl: 'https://github.com/mikemaz-dev/Embrace-Agency'
	},
	{
		slug: 'private-client-platform',
		title: 'Private Client Platform',
		kind: 'Confidential commercial work',
		summary: 'Frontend work for a long-term client project, presented without sensitive details.',
		problem:
			'The client needed reliable frontend support while keeping the product, brand, and internal data private.',
		solution:
			'Delivered interface updates, layout improvements, bug fixes, and feature support within an existing product workflow.',
		result:
			'Ongoing collaboration with a repeat client, focused on stable delivery, quick communication, and business-oriented execution.',
		techs: ['React.js', 'TypeScript', 'Frontend architecture', 'UI maintenance'],
		preview: '',
		isPrivate: true
	}
]

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			'Mike is attentive, reliable, and fast in communication. He helped us improve frontend tasks with care and consistency.',
		authorName: 'Long-term client',
		authorRole: 'Product owner',
		companyLabel: 'Private project',
		isAnonymized: true
	}
]

export const FAQ_ITEMS = [
	{
		question: 'What kind of projects do you take?',
		answer:
			'Landing pages, business websites, frontend for web products, and UI improvements for existing projects.'
	},
	{
		question: 'Can you work from a Figma design?',
		answer:
			'Yes. I can build from a prepared design or help structure the page if you only have a rough idea.'
	},
	{
		question: 'Do you show private client work?',
		answer:
			'Only in an anonymized way. I do not publish client names, screenshots, domains, or sensitive metrics without permission.'
	},
	{
		question: 'How do we start?',
		answer:
			'Send me a short message in Telegram or by email with your goal, timeline, and any links or design files you already have.'
	}
] as const
