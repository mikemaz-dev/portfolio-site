'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { twMerge } from 'tailwind-merge'

import type { IPageLink } from './data/links.types'

interface Props {
	link: IPageLink
	className?: string
}

export function PageLink({ link, className }: Props) {
	const pathName = usePathname()
	const isActive = match(link.href, { decode: decodeURIComponent })(pathName)

	return (
		<li
			className={twMerge(
				`px-3 py-1.5 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors`,
				isActive && `text-white bg-white/10`,
				className
			)}
		>
			<Link
				href={link.href}
				className='block w-full whitespace-nowrap'
			>
				{link.name}
			</Link>
		</li>
	)
}
