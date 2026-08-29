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
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<svg
						aria-label='mikemaz-dev monogram'
						width='42'
						height='42'
						viewBox='0 0 512 512'
						fill='none'
					>
						<path
							d='M84 374V132L236 294L388 132V348'
							stroke='#F4F5F7'
							strokeWidth='46'
							strokeLinecap='square'
							strokeLinejoin='miter'
						/>
						<path
							d='M348 400H432'
							stroke='#2F5BFF'
							strokeWidth='28'
							strokeLinecap='square'
						/>
					</svg>
					<span>mikemaz-dev</span>
				</div>
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
						FRONTEND / UI / PRODUCT LOGIC
					</span>
					<span style={{ fontSize: 20, lineHeight: 1.35 }}>{copy.hero.lead}</span>
				</div>
			</div>
			<div style={{ display: 'flex', width: '100%', height: 7, background: '#2F5BFF' }} />
		</div>,
		OG_IMAGE_SIZE
	)
}
