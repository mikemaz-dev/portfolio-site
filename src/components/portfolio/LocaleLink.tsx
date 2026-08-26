'use client'

import type { MouseEvent, ReactNode } from 'react'

export function LocaleLink({
	href,
	hrefLang,
	label,
	children
}: {
	href: string
	hrefLang: string
	label: string
	children: ReactNode
}) {
	const preserveSection = (event: MouseEvent<HTMLAnchorElement>) => {
		if (!window.location.hash) return

		event.currentTarget.href = new URL(
			`${href}${window.location.hash}`,
			window.location.origin
		).toString()
	}

	return (
		<a
			className='language-switch'
			href={href}
			hrefLang={hrefLang}
			aria-label={label}
			onClick={preserveSection}
		>
			{children}
		</a>
	)
}
