import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
				]
			}
		]
	}
}

export default nextConfig
