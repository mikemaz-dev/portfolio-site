import { PAGE } from '@/config/sections.config'
import type { IHeader } from '@/types/header.types'

export const HEADER_DATA: IHeader[] = [
	{
		name: 'Home',
		href: PAGE.BASE
	},
	{
		name: 'About',
		href: PAGE.ABOUT
	},
	{
		name: 'Certificates',
		href: PAGE.CERTIFICATES
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