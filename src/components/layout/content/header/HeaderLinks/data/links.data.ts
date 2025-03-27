import { PAGE } from '@/config/public-page.config'

import type { IPageLink } from './links.types'

export const HEADER_LINKS_DATA: IPageLink[] = [
	{
		name: 'Home',
		href: PAGE.HOME
	},
	{
		name: 'About Me',
		href: PAGE.ABOUT
	},
	{
		name: 'Projects',
		href: PAGE.PROJECTS
	},
	{
		name: 'Contacts',
		href: PAGE.CONTACTS
	}
]
