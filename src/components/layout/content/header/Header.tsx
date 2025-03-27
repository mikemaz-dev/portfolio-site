'use client'

import { motion } from 'framer-motion'

import { HeaderLinks } from './HeaderLinks/HeaderLinks'
import { Logo } from './Logo'

interface Props {}

export function Header({}: Props) {
	return (
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
			className='w-screen px-10 max-sm:px-4 py-4
				bg-zinc-900/40 backdrop-blur-xl
				ring-1 ring-white/10
				rounded-b-2xl
				flex items-center justify-between'
		>
			<Logo />
			<HeaderLinks />
		</motion.header>
	)
}
