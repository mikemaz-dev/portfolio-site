'use client'

import { HeaderBurger } from './HeaderBurger/HeaderBurger'
import { PageLink } from './PageLink'
import { HEADER_LINKS_DATA } from './data/links.data'

export function HeaderLinks() {
	return (
		<nav className='relative'>
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
			<HeaderBurger classname='hidden max-sm:block' />
		</nav>
	)
}
