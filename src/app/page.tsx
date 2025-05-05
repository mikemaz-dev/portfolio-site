import { ContentSections } from '@/components/layout/content/ContentSections'
import { Hero } from '@/components/layout/content/hero/Hero'

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen pb-15'>
			<Hero />
			<ContentSections />
		</div>
	)
}
