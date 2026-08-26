import type { Viewport } from 'next'
import type { ReactNode } from 'react'

import '../globals.css'

import { onest } from '@/app/fonts'
import { createSiteMetadata } from '@/lib/site-metadata'

export const metadata = createSiteMetadata('en')
export const viewport: Viewport = {
	themeColor: '#0B0C0F',
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover'
}

export default function EnglishLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html
			lang='en'
			data-scroll-behavior='smooth'
		>
			<body className={onest.variable}>{children}</body>
		</html>
	)
}
