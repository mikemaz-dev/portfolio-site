'use client'

import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import { useDropdown } from '@/hooks/useDropdown'

import { PageLink } from '../PageLink'
import { HEADER_LINKS_DATA } from '../data/links.data'

import { Burger } from './Burger'

interface Props {
	classname?: string
}

export function HeaderBurger({ classname }: Props) {
	const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown()

	return (
		<div
			className={twMerge(classname)}
			ref={dropdownRef}
		>
			<Burger
				isOpen={isDropdownOpen('header_menu')}
				toggleDropdown={() => toggleDropdown('header_menu')}
			/>
			{isDropdownOpen('header_menu') && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					className='bg-zinc-900 px-2 py-3 rounded-b-2xl absolute top-10 right-1 sm:w-auto sm:max-w-xs'
				>
					<ul className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4'>
						{HEADER_LINKS_DATA.map((link, i) => (
							<PageLink
								link={link}
								key={i}
								className='w-full'
							/>
						))}
					</ul>
				</motion.div>
			)}
		</div>
	)
}
