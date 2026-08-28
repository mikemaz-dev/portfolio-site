import { ImageResponse } from 'next/og'

import { CONTENT, type Locale } from '@/data/site-content'

export const OG_IMAGE_SIZE = { width: 1200, height: 630 }

export function createOgImage(locale: Locale) {
	const copy = CONTENT[locale]
	const titleLines = copy.hero.title.split('\n')

	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: '#0B0C0F',
				color: '#F4F5F7',
				padding: '58px 64px 0',
				fontFamily: 'Arial, sans-serif'
			}}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21 }}>
				<span>mazdev_14</span>
				<span style={{ color: 'rgba(244,245,247,.62)' }}>{copy.hero.eyebrow}</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
				<div
					style={{
						display: 'flex',
						width: 790,
						flexShrink: 0,
						flexDirection: 'column',
						fontSize: locale === 'ru' ? 72 : 96,
						fontWeight: 300,
						lineHeight: 0.86,
						letterSpacing: '-5px'
					}}
				>
					{titleLines.map(line => (
						<span key={line}>{line}</span>
					))}
				</div>
				<div
					style={{
						display: 'flex',
						width: 250,
						flexShrink: 0,
						flexDirection: 'column',
						gap: 14,
						paddingBottom: 12
					}}
				>
					<span style={{ color: 'rgba(244,245,247,.48)', fontSize: 15, letterSpacing: '2px' }}>
						{copy.hero.focusLabel.toUpperCase()}
					</span>
					<span style={{ fontSize: 22 }}>{copy.hero.focus}</span>
				</div>
			</div>
			<div style={{ display: 'flex', width: '100%', height: 7, background: '#2F5BFF' }} />
		</div>,
		OG_IMAGE_SIZE
	)
}
