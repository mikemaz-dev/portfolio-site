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
					className='group fixed right-[15.8px] bottom-6 z-40 cursor-pointer rounded-full border border-neutral-600 bg-neutral-800/60 p-3 text-white transition-colors hover:bg-neutral-800 max-sm:bg-neutral-800'
				>
					<ArrowUp className='size-5 text-neutral-100/80 transition-colors group-hover:text-neutral-100' />
				</m.button>
			)}
		</AnimatePresence>
	)
}
