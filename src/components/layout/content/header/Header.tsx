'use client'

import cn from 'clsx'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'

import { HeaderLinks } from './HeaderLinks/HeaderLinks'

interface Props {}

export function Header({}: Props) {
	const [isShow, setIsShow] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			if (currentScrollY > lastScrollY && currentScrollY > 80) {
				setIsShow(false)
			} else {
				setIsShow(true)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [lastScrollY])

	return (
		<m.header
			initial={{ y: 0 }}
			animate={{ y: isShow ? 0 : -100 }}
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className={cn(
				'fixed right-20 z-50 bg-neutral-800/60 backdrop-blur-md px-6 py-3 sm:px-3 sm:py-2 rounded-xl',
			)}
		>
			<HeaderLinks />
		</m.header>
	)
}
