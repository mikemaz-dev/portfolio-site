import { HEADER_DATA } from '@/data/header/header.data'
import cn from 'clsx'
import { useState } from 'react'
import { DownloadCVButton } from './DownloadCVButton'

export function HeaderMobile() {
	const [menuOpen, setMenuOpen] = useState(false)
	return (
		<div className='flex items-center gap-6 md:hidden'>
			<div className='block md:hidden'>
				<DownloadCVButton />
			</div>
			<button
				onClick={() => setMenuOpen(!menuOpen)}
				className='md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 group'
				aria-label='Toggle menu'
			>
          <span
	          className={cn(
		          'block h-0.5 w-6 bg-neutral-200 rounded-sm transition-all duration-300',
		          menuOpen ? 'rotate-45 translate-y-1.5' : ''
	          )}
          ></span>
				<span
					className={cn(
						'block h-0.5 w-6 bg-neutral-200 rounded-sm transition-all duration-300 my-1',
						menuOpen ? 'opacity-0' : 'opacity-100'
					)}
				></span>
				<span
					className={cn(
						'block h-0.5 w-6 bg-neutral-200 rounded-sm transition-all duration-300',
						menuOpen ? '-rotate-45 -translate-y-1.5' : ''
					)}
				></span>
			</button>
			
			<div
				className={cn(
					'fixed top-0 left-0 h-screen w-screen bg-neutral-900 shadow-md flex flex-col items-center justify-center gap-8 text-xl font-medium text-neutral-200 transform transition-transform duration-500 md:hidden',
					menuOpen ? '-translate-y-0' : '-translate-y-full'
				)}
			>
				<ul className='flex flex-col gap-6 items-center'>
					{HEADER_DATA.map((data, i) => (
						<li key={i}>
							<a
								href={data.href}
								onClick={() => setMenuOpen(false)}
								className='hover:text-white text-[32px] transition-all duration-300'
							>
								{data.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>)
}
