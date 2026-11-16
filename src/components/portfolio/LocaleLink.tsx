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
			className='inline-flex min-h-11 items-center gap-1 rounded-full bg-chip/95 px-4 text-[13px] tracking-[0.01em] uppercase transition-colors duration-500 group-data-[theme=dark]/header:bg-[#22232c]/95 group-data-[theme=dark]/header:text-white hover:bg-ink hover:text-white max-sm:px-3'
			href={href}
			hrefLang={hrefLang}
			aria-label={label}
			onClick={preserveSection}
		>
			{children}
		</a>
	)
}
