'use client'

import { AnimatePresence, motion } from 'motion/react'
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
		<motion.li
			transition={{ type: 'spring', stiffness: 300, damping: 20 }}
			className={twMerge(
				`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-white/70 text-sm tracking-widest cursor-pointer transition-colors duration-300 hover:text-white hover:bg-white/5[box-shadow:inset_0_0_8px_rgba(255,255,255,0.08)] hover:[box-shadow:inset_0_0_12px_rgba(255,255,255,0.15)]`,
				isActive &&
					`bg-white/10 text-white [box-shadow:inset_0_0_12px_rgba(255,255,255,0.15)] pointer-events-none`,
				className
			)}
		>
			<AnimatePresence>
				{isActive && (
					<motion.span
						initial={{ opacity: 0, x: -8, y: 2, scale: 0.8 }}
						animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
						exit={{ opacity: 0, x: -8, y: 2, scale: 0.8 }}
						transition={{ type: 'spring', stiffness: 400, damping: 20 }}
						className='relative w-2 h-2 rounded-full bg-white'
					>
						<motion.span
							animate={{
								scale: [1, 1.6, 1],
								opacity: [0.6, 0, 0.6]
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: 'easeInOut'
							}}
							className='absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-200 to-indigo-100 blur-xs'
						/>
					</motion.span>
				)}
			</AnimatePresence>
			<Link
				href={link.href}
				className='whitespace-nowrap'
			>
				{link.name}
			</Link>
		</motion.li>
	)
}
