'use client'

import { Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
	return (
		<footer
			id='footer'
			className='border-t border-t-neutral-700/50 text-neutral-400 py-6'
		>
			<div className='container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-1'>
				<span className='text-sm'>&copy; {new Date().getFullYear()} Mikhail Mazurkevich.</span>

				<span className='flex items-center text-sm'>
					Made with
					<Heart
						className='w-4 h-4 mx-1 text-transparent'
						fill='#fb2c36'
					/>
					by&nbsp;
					<Link
						href='https://github.com/mikemaz-dev'
						target='_blank'
						rel='noopener noreferrer'
						className='text-neutral-200 hover:text-white transition-colors duration-300'
					>
						Mikhail
					</Link>
				</span>
			</div>
		</footer>
	)
}
