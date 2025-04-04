import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	className?: string
	variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
}

const variantClasses = {
	primary: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-500',
	secondary: 'bg-neutral-700/50 text-white border-neutral-700 hover:bg-neutral-700/65',
	destructive: 'bg-red-600 text-white border-red-700 hover:bg-red-500',
	outline: 'bg-transparent text-white border-white/40 hover:bg-white/10',
	ghost: 'bg-transparent text-white border-none hover:bg-white/10'
}

export function Button({ children, className, variant = 'primary' }: Props) {
	return (
		<m.button
			className={twMerge(
				'relative px-4 max-sm:px-3 py-2.5 backdrop-blur-md border-2 font-medium rounded-lg cursor-pointer transition-colors duration-300 ease-in-out max-sm:text-sm',
				variantClasses[variant],
				className
			)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</m.button>
	)
}
