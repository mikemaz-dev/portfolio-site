import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

export function Burger({
	isOpen,
	toggleDropdown,
	className
}: {
	isOpen: boolean
	toggleDropdown: () => void
	className?: string
}) {
	return (
		<motion.button
			onClick={toggleDropdown}
			className={twMerge('flex flex-col gap-1.5', className)}
			aria-label='Toggle Menu'
		>
			<motion.span
				className='h-0.5 w-6.5 bg-white rounded-md'
				animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			/>

			<motion.span
				className='h-0.5 w-6.5 bg-white rounded-md'
				animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
				transition={{
					duration: 0.2,
					ease: 'easeInOut',
					delay: isOpen ? 0 : 0.1
				}}
			/>

			<motion.span
				className='h-0.5 w-6.5 bg-white rounded-md'
				animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			/>
		</motion.button>
	)
}
