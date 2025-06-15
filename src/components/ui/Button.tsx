import * as m from 'motion/react-m'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	className?: string
	variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
	iconOnly?: boolean
	minimalistic?: boolean
}

const variantClasses = {
	primary: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-500',
	secondary: 'bg-neutral-700/50 text-white border-neutral-700 hover:bg-neutral-700/65',
	destructive: 'bg-red-600 text-white border-red-700 hover:bg-red-500',
	outline: 'bg-transparent text-white border-neutral-700/60 hover:bg-white/10',
	ghost: 'bg-transparent text-white border-none hover:bg-white/10'
}

export function Button({
	children,
	className,
	variant = 'primary',
	iconOnly,
	minimalistic,
	...props
}: Props) {
	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		<m.button
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.98 }}
			className={twMerge(
				'relative font-medium rounded-lg border-2 cursor-pointer backdrop-blur-md transition-all duration-300 ease-in-out',

				iconOnly ? 'p-1 w-8 h-8 flex items-center justify-center' : 'px-3 py-1.5 max-sm:text-xs',

				minimalistic && 'px-2 py-1 text-xs',

				variantClasses[variant],
				className
			)}
			{...props}
		>
			{children}
		</m.button>
	)
}
