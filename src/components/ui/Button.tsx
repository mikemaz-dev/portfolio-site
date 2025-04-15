import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	className?: string
	variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
	iconOnly?: boolean
}

const variantClasses = {
	primary: 'bg-blue-600 text-white border-blue-700 hover:bg-blue-500',
	secondary: 'bg-neutral-700/50 text-white border-neutral-700 hover:bg-neutral-700/65',
	destructive: 'bg-red-600 text-white border-red-700 hover:bg-red-500',
	outline: 'bg-transparent text-white border-neutral-700/60 hover:bg-white/10',
	ghost: 'bg-transparent text-white border-none hover:bg-white/10'
}

export function Button({ children, className, variant = 'primary', iconOnly, ...props }: Props) {
	return (
		<button
			className={twMerge(
				'relative font-medium rounded-lg border-2 cursor-pointer backdrop-blur-md transition-all duration-300 ease-in-out',
				iconOnly
					? 'p-2 w-10 h-10 flex items-center justify-center'
					: 'px-4 max-sm:px-3 py-2.5 max-sm:text-sm',
				variantClasses[variant],
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
