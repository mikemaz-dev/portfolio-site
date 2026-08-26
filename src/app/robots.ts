import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/data/site-content'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/'
		},
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL
	}
}
