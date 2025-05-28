import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Layout } from '@/components/layout/Layout'

import { Providers } from '@/providers/Providers'

import './globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin']
})

export const metadata: Metadata = {
	icons: {
		icon: '/logos/favicon/m/favicon.ico',
		apple: '/logos/favicon/m/apple-touch-icon.png'
	},
	title: 'Mikhail Mazurkevich',
	description: 'Portfolio website',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['mazurkevich.mikhail.14@gmail.com']
	},
	publisher: 'Mikhail Mazurkevich',
	formatDetection: {
		telephone: false
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}
