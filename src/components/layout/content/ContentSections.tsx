import { Certificates } from '@/components/layout/content/about/Certificates/Certificates'
import { Projects } from '@/components/layout/content/projects/Projects'

import { Heading } from '@/ui/Heading'
import { TechStack } from '@/ui/techstack/TechStack'

import { AboutMeBlocks } from './about/AboutMeBlocks'

export function ContentSections() {
	return (
		<div className='flex flex-col min-h-screen'>
			<section
				className='w-full flex flex-col items-start max-sm:flex-col gap-10 mt-30 max-sm:mt-20'
				id='about-me'
			>
				<Heading title='About Me' />
				<AboutMeBlocks />
			</section>
			<section className='w-full flex flex-col items-start max-sm:flex-col gap-10 mt-25 max-sm:mt-20'>
				<Heading title='Tech stack' />
				<TechStack />
			</section>
			<section className='w-full flex flex-col items-start max-sm:flex-col gap-10 mt-25 max-sm:mt-20'>
				<Heading title='Certificates' />
				<Certificates />
			</section>
			<section className='w-full flex flex-col items-start max-sm:flex-col gap-10 mt-25 max-sm:mt-20'>
				<Heading title='Projects' />
				<Projects />
			</section>
		</div>
	)
}
