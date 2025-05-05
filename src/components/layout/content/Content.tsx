'use client'

import { type PropsWithChildren, useState } from 'react'

import { Loader } from '@/ui/Loader'
import { ScrollToTopButton } from '@/ui/ScrollToTopButton'

import { Footer } from './Footer'

export function Content({ children }: PropsWithChildren<unknown>) {
	const [isLoading, setIsLoading] = useState(true)
	return (
		<div>
			{isLoading && <Loader onFinish={() => setIsLoading(false)} />}
			{!isLoading && (
				<>
					<main className='container mx-auto px-20 pt-25 max-sm:px-5 max-sm:pt-15 relative'>
						<section>{children}</section>
						<ScrollToTopButton />
					</main>
					<Footer />
				</>
			)}
		</div>
	)
}
