import { Difficulties, type IProject } from './project.types'

export const PROJECTS_DATA: IProject[] = [
	{
		preview: '/wip_screen/next-pizza.png',
		title: 'NextPizza',
		description: 'Modern full-stack pizza delivery app',
		excludeTechs: [
			'JavaScript',
			'Framer Motion',
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
			'Shadcn',
			'Zustand',
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
			'Shadcn',
			'Sass',
			'Zustand',
			'Mantine',
			'Webpack',
			'Prettier',
			'ESLint'
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
			'Shadcn',
			'Sass',
			'Zustand',
			'Formik',
			'NextAuth.js',
			'Mantine',
			'Webpack',
			'Prettier',
			'ESLint'
		],
		difficult: Difficulties.Beginner,
		livelink: 'https://mikemaz-dev.github.io/Embrace-Agency/',
		githubLink: 'https://github.com/mikemaz-dev/Embrace-Agency'
	}
]
