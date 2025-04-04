import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { SOCIALS_DATA } from '@/data/socials/socials.data'

export function Socials() {
	return (
		<div className='flex max-sm:flex-col items-end'>
			<div className='flex flex-col py-2 max-sm:p-2 max-sm:flex-row max-sm:items-center max-sm:justify-between max-sm:gap-2.5 max-sm:w-full bg-neutral-800/40 border-2 border-neutral-800 border-r-0 max-sm:border-r-2 max-sm:border-b-0 rounded-l-lg max-sm:rounded-r-lg max-sm:rounded-b-none'>
				{SOCIALS_DATA.map(({ link, icon, alt }) => (
					<Link
						key={alt}
						href={link}
						target='_blank'
						title={alt}
						className={twMerge(
							'group px-4 py-1.5 border-l border-l-transparent transition-colors duration-300 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:gap-1',
							alt === 'Linkedin' && 'hover:border-l-blue-500/80',
							alt === 'Instagram' && 'hover:border-l-pink-500/80',
							alt === 'GitHub' && 'hover:border-l-white/80'
						)}
					>
						<Image
							src={icon}
							alt={alt}
							width={28}
							height={28}
							className='transition-transform duration-300  group-hover:scale-110'
						/>
						<span className='hidden max-sm:block font-semibold text-white/88'>{alt}</span>
					</Link>
				))}
			</div>
		</div>
	)
}
