'use client'

import { PageLink } from './PageLink'
import { HEADER_LINKS_DATA } from './data/links.data'

export function HeaderLinks() {
	return (
		<nav className=''>
			<ul className='flex items-center gap-1.5 max-sm:hidden rounded-full'>
				{HEADER_LINKS_DATA.map((link, i) => {
					return (
						<PageLink
							link={link}
							key={i}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
