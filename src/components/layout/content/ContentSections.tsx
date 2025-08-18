import { AboutMe } from '@/components/layout/content/about/AboutMe'
import {
	Certificates
} from '@/components/layout/content/about/Certificates/Certificates'
import { Projects } from '@/components/layout/content/projects/Projects'

import { Heading } from '@/ui/Heading'

export function ContentSections() {
	return (
		<div className='flex flex-col min-h-screen'>
			<section
				className='w-full flex flex-col items-start section max-sm:flex-col gap-10'
				id='about'
			>
				<Heading title='About' />
				<AboutMe />
			</section>
			<section className='w-full flex flex-col items-start max-sm:flex-col gap-10 section' id='certificates'>
				<Heading title='Certificates' />
				<Certificates />
			</section>
			<section className='w-full flex flex-col items-start max-sm:flex-col gap-10 section' id='projects'>
				<Heading title='Projects' />
				<Projects />
			</section>
		</div>
	)
}
