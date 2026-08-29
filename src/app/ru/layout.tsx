import type { Viewport } from 'next'
import type { ReactNode } from 'react'

import { YandexMetrika } from '@/components/portfolio/YandexMetrika'

import '../globals.css'

import { onest } from '@/app/fonts'
import { createSiteMetadata } from '@/lib/site-metadata'

export const metadata = createSiteMetadata('ru')
export const viewport: Viewport = {
	themeColor: '#0B0C0F',
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover'
}

export default function RussianLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html
			lang='ru'
			data-scroll-behavior='smooth'
		>
			<body className={onest.variable}>
				{children}
				<YandexMetrika />
			</body>
		</html>
	)
}
