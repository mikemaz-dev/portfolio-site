import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Mikhail Mazurkevich — Frontend Developer',
		short_name: 'mazdev_14',
		description: 'Frontend developer portfolio built with React, Next.js and TypeScript.',
		start_url: '/',
		display: 'standalone',
		background_color: '#F4F5F7',
		theme_color: '#0B0C0F',
		icons: [
			{
				src: '/logos/favicon/m/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/logos/favicon/m/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		]
	}
}
