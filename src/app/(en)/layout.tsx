import type { Viewport } from 'next'
import type { ReactNode } from 'react'

import { YandexMetrika } from '@/components/portfolio/YandexMetrika'

import '../globals.css'

import { onest } from '@/app/fonts'
import { createSiteMetadata } from '@/lib/site-metadata'

export const metadata = createSiteMetadata('en')
export const viewport: Viewport = {
	themeColor: '#f0f1fa',
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
			<body className={onest.variable}>
				{children}
				<YandexMetrika />
			</body>
		</html>
	)
}
