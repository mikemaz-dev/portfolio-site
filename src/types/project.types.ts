export interface IProject {
	preview: string
	title: string
	description: string
	excludeTechs: string[]
	difficult: keyof typeof Difficulties
	livelink: string
	githubLink: string
}

export const Difficulties = {
	Beginner: 'Beginner',
	Intermediate: 'Intermediate',
	Advanced: 'Advanced'
} as const
