import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useState } from 'react'

const greetings = ['Hello', 'Cześć', 'Hallo', 'Bonjour', 'Hola']

export function Loader({ onFinish }: { onFinish: () => void }) {
	const [isVisible, setIsVisible] = useState(true)
	const [index, setIndex] = useState(0)

	useEffect(() => {
		greetings.forEach((_, i) => {
			setTimeout(() => {
				setIndex(i)
				if (i === greetings.length - 1) {
					setTimeout(() => setIsVisible(false), 1000)
				}
			}, i * 1200)
		})
	}, [])

	useEffect(() => {
		if (!isVisible) {
			const timeout = setTimeout(() => {
				onFinish()
			}, 1000)
			return () => clearTimeout(timeout)
		}
	}, [isVisible, onFinish])

	return (
		<AnimatePresence>
			{isVisible && (
				<m.div
					className='fixed inset-0 bg-neutral-800/30 flex items-center justify-center z-50'
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
				>
					<AnimatePresence mode='wait'>
						<m.h1
							className='text-5xl md:text-7xl font-semibold text-neutral-200'
							key={index}
							initial={{ opacity: 0, scale: 0.8, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -20 }}
							transition={{ duration: 0.6 }}
						>
							{greetings[index]}
						</m.h1>
					</AnimatePresence>
				</m.div>
			)}
		</AnimatePresence>
	)
}
