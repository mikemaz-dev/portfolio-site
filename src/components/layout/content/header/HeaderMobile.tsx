import cn from 'clsx'
import { useState } from 'react'

import { DownloadCVButton } from './DownloadCVButton'
import { HEADER_DATA } from '@/data/header/header.data'

export function HeaderMobile() {
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<div className='flex items-center gap-6 md:hidden'>
			<div className='block md:hidden'>
				<DownloadCVButton />
			</div>
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className='group z-50 flex h-8 w-8 flex-col items-center justify-center md:hidden'
				aria-label='Toggle menu'
			>
				<span
					className={cn(
						'block h-0.5 w-6 rounded-sm bg-neutral-200 transition-all duration-300',
						menuOpen ? 'translate-y-1.5 rotate-45' : ''
					)}
				></span>
				<span
					className={cn(
						'my-1 block h-0.5 w-6 rounded-sm bg-neutral-200 transition-all duration-300',
						menuOpen ? 'opacity-0' : 'opacity-100'
					)}
				></span>
				<span
					className={cn(
						'block h-0.5 w-6 rounded-sm bg-neutral-200 transition-all duration-300',
						menuOpen ? '-translate-y-1.5 -rotate-45' : ''
					)}
				></span>
			</button>

			<div
				className={cn(
					'fixed top-0 left-0 flex h-screen w-screen transform flex-col items-center justify-center gap-8 bg-neutral-900 text-xl font-medium text-neutral-200 shadow-md transition-transform duration-500 md:hidden',
					menuOpen ? '-translate-y-0' : '-translate-y-full'
				)}
			>
				<ul className='flex flex-col items-center gap-6'>
					{HEADER_DATA.map((data, i) => (
						<li key={i}>
							<a
								href={data.href}
								onClick={() => setMenuOpen(false)}
								className='text-[32px] transition-all duration-300 hover:text-white'
							>
								{data.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
