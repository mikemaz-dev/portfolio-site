'use client'

import { ScrollToTopButton } from '@/ui/ScrollToTopButton'
import { type PropsWithChildren } from 'react'

import { Footer } from './Footer'
import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren) {
	
	return (
		<>
			<Header />
			<main className='container mx-auto relative'>
				{children}
				<ScrollToTopButton />
			</main>
			<Footer />
		</>
	)
}
