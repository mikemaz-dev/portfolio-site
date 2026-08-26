import type { Metadata } from 'next'

import { type Locale, SITE_URL } from '@/data/site-content'

const metadataCopy = {
	en: {
		title: 'mazdev_14 — Frontend Developer',
		description:
			'Mikhail Mazurkevich builds clean, responsive interfaces and web products with React and Next.js.'
	},
	ru: {
		title: 'mazdev_14 — Frontend-разработчик',
		description:
			'Михаил Мазуркевич создаёт чистые адаптивные интерфейсы и веб-продукты на React и Next.js.'
	}
} as const

export function createSiteMetadata(locale: Locale): Metadata {
	const copy = metadataCopy[locale]
	const canonical = locale === 'en' ? SITE_URL : `${SITE_URL}/ru`

	return {
		metadataBase: new URL(SITE_URL),
		title: copy.title,
		description: copy.description,
		applicationName: 'mazdev_14 portfolio',
		category: 'technology',
		keywords:
			locale === 'en'
				? [
						'Mikhail Mazurkevich',
						'mazdev_14',
						'frontend developer',
						'React developer',
						'Next.js developer',
						'TypeScript developer',
						'frontend portfolio'
					]
				: [
						'Михаил Мазуркевич',
						'mazdev_14',
						'frontend-разработчик',
						'React разработчик',
						'Next.js разработчик',
						'создание сайтов',
						'портфолио frontend-разработчика'
					],
		authors: [{ name: 'Mikhail Mazurkevich', url: CONTACT_URLS.github }],
		creator: 'Mikhail Mazurkevich',
		publisher: 'Mikhail Mazurkevich',
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1
			}
		},
		alternates: {
			canonical,
			languages: {
				en: SITE_URL,
				ru: `${SITE_URL}/ru`,
				'x-default': SITE_URL
			}
		},
		openGraph: {
			type: 'profile',
			url: canonical,
			title: copy.title,
			description: copy.description,
			siteName: 'mazdev_14',
			locale: locale === 'en' ? 'en_US' : 'ru_RU',
			alternateLocale: locale === 'en' ? ['ru_RU'] : ['en_US'],
			images: [
				{
					url: '/images/mikhail-hero-v2.webp',
					width: 1107,
					height: 1421,
					alt: 'Mikhail Mazurkevich — frontend developer'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: copy.title,
			description: copy.description,
			images: ['/images/mikhail-hero-v2.webp']
		},
		icons: {
			icon: '/favicon.ico'
		}
	}
}

const CONTACT_URLS = {
	github: 'https://github.com/mikemaz-dev'
} as const
