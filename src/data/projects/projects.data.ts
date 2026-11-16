import { Difficulties, type IProject } from '@/types/project.types'

export const PROJECTS_DATA: IProject[] = [
	{
		preview: '/wip_screen/taskhub.png',
		title: 'TaskHub',
		description: 'Modern Task Management Platform',
		excludeTechs: [
			'JavaScript',
			'Framer Motion',
			'NextAuth.js',
			'React Redux',
			'React Router',
			'Sass',
			'HTML',
			'CSS',
			'Formik',
			'Mantine',
			'Webpack',
			'Prettier',
			'ESLint'
		],
		difficult: Difficulties.Advanced,
		livelink: 'https://taskhub-green.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/taskhub'
	},
	{
		preview: '/wip_screen/next-pizza.png',
		title: 'NextPizza',
		description: 'Modern full-stack pizza delivery app',
		excludeTechs: [
			'JavaScript',
			'Framer Motion',
			'React Redux',
			'React Router',
			'Supabase',
			'Recharts',
			'Sass',
			'HTML',
			'CSS',
			'Formik',
			'Mantine',
			'Webpack',
			'Prettier',
			'ESLint'
		],
		difficult: Difficulties.Advanced,
		livelink: 'https://next-pizza-7zt4-nine.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/next-pizza'
	},
	{
		preview: '/wip_screen/justbank.png',
		title: 'JustBank',
		description:
			'A modern banking interface featuring transaction management, statistics, and account operations',
		excludeTechs: [
			'Next.js',
			'React.js',
			'NextAuth.js',
			'Framer Motion',
			'React Redux',
			'React Router',
			'TypeScript',
			'Tailwind',
			'Shadcn/ui',
			'React Hook Form',
			'Zod',
			'Zustand',
			'Supabase',
			'Recharts',
			'Formik',
			'Mantine'
		],
		difficult: Difficulties.Advanced,
		livelink: 'https://justbank.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/justbank'
	},
	{
		preview: '/wip_screen/marvel.png',
		title: 'Marvel information portal',
		description: 'App to browse Marvel heroes',
		excludeTechs: [
			'Next.js',
			'NextAuth.js',
			'Framer Motion',
			'React Redux',
			'TypeScript',
			'Tailwind',
			'Shadcn/ui',
			'Sass',
			'Zustand',
			'Supabase',
			'Recharts',
			'Webpack',
			'Prettier',
			'ESLint',
			'React Hook Form',
			'Zod'
		],
		difficult: Difficulties.Intermediate,
		livelink: 'https://marvel-react-three.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/marvelReact'
	},
	{
		preview: '/wip_screen/embrace.png',
		title: 'Embrace Agency',
		description: 'Stylish one-page creative agency site',
		excludeTechs: [
			'TypeScript',
			'React.js',
			'React Router',
			'Next.js',
			'Framer Motion',
			'React Redux',
			'Typescript',
			'Tailwind',
			'Shadcn/ui',
			'React Hook Form',
			'Recharts',
			'Sass',
			'Zustand',
			'Supabase',
			'Formik',
			'NextAuth.js',
			'Webpack',
			'Prettier',
			'ESLint',
			'Zod'
		],
		difficult: Difficulties.Beginner,
		livelink: 'https://mikemaz-dev.github.io/Embrace-Agency/',
		githubLink: 'https://github.com/mikemaz-dev/Embrace-Agency'
	}
]
