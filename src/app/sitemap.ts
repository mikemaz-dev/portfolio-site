import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/data/site-content'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
			alternates: {
				languages: {
					en: SITE_URL,
					ru: `${SITE_URL}/ru`
				}
			}
		},
		{
			url: `${SITE_URL}/ru`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.9,
			alternates: {
				languages: {
					en: SITE_URL,
					ru: `${SITE_URL}/ru`
				}
			}
		}
	]
}
