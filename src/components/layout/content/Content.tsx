'use client'

import { type PropsWithChildren } from 'react'

import { ScrollToTopButton } from '@/ui/ScrollToTopButton'

import { Footer } from './Footer'
import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren) {
	return (
		<>
			<Header />
			<main className='relative'>
				{children}
				<ScrollToTopButton />
			</main>
			<Footer />
		</>
	)
}
