'use client'

import * as m from 'motion/react-m'

import { HeaderLinks } from './HeaderLinks/HeaderLinks'
import { Logo } from './Logo'

interface Props {}

export function Header({}: Props) {
	return (
		<m.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className='w-screen fixed z-500 px-10 max-sm:px-4 py-4
				bg-zinc-90/0 backdrop-blur-xs
				flex items-center justify-between'
		>
			<Logo />
			<HeaderLinks />
		</m.header>
	)
}
