import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-DNS-Prefetch-Control', value: 'on' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload'
					}
				]
			}
		]
	},

	output: 'standalone',

	compress: true,

	typescript: {
		ignoreBuildErrors: false
	}
}

export default nextConfig
