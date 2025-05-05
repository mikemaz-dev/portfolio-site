'use client'

import { ArrowUp } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false)
	const [bottom, setBottom] = useState(24)

	useEffect(() => {
		const footer = document.getElementById('footer')
		const onScroll = () => {
			const scrolled = window.scrollY > 580
			setVisible(scrolled)

			if (!footer) return
			const footerRect = footer.getBoundingClientRect()
			const overlap = window.innerHeight - footerRect.top
			setBottom(overlap > 0 ? overlap + 16 : 24)
		}

		window.addEventListener('scroll', onScroll)
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<AnimatePresence>
			{visible && (
				<m.button
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.3 }}
					onClick={scrollToTop}
					aria-label='Scroll to top'
					style={{ bottom: `${bottom}px` }}
					className='fixed bottom-6 right-[15.8px] z-50 group rounded-full cursor-pointer bg-neutral-800/60 max-sm:bg-neutral-800 border border-neutral-600 text-white p-3 hover:bg-neutral-800 transition-colors'
				>
					<ArrowUp className='size-5 text-neutral-100/80 group-hover:text-neutral-100 transition-colors' />
				</m.button>
			)}
		</AnimatePresence>
	)
}
