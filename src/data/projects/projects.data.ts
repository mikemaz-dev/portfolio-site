import { Difficulties, type IProject } from './project.types'

export const PROJECTS_DATA: IProject[] = [
	{
		preview: '/wip_screen/next-pizza.png',
		title: 'NextPizza',
		description: 'Modern full-stack pizza delivery app.',
		excludeTechs: ['Framer Motion', 'React Redux', 'React Router', 'Sass', 'HTML', 'Css', 'Formik'],
		difficult: Difficulties.Advanced,
		livelink: 'https://next-pizza-7zt4-nine.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/next-pizza'
	},
	{
		preview: '/wip_screen/marvel.png',
		title: 'Marvel information portal',
		description:
			'App to browse Marvel heroes using React routing, forms, and pre-rendering via react-snap.',
		excludeTechs: [
			'Next.js',
			'Framer Motion',
			'React Redux',
			'Typescript',
			'Tailwind',
			'Shadcn',
			'Sass',
			'Zustand'
		],
		difficult: Difficulties.Intermediate,
		livelink: 'https://marvel-react-three.vercel.app/',
		githubLink: 'https://github.com/mikemaz-dev/marvelReact'
	},
	{
		preview: '/wip_screen/embrace.png',
		title: 'Embrace Agency',
		description:
			'Stylish one-page creative agency site with scroll animations.',
		excludeTechs: [
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
			'Formik'
		],
		difficult: Difficulties.Beginner,
		livelink: 'https://mikemaz-dev.github.io/Embrace-Agency/',
		githubLink: 'https://github.com/mikemaz-dev/Embrace-Agency'
	}
]
