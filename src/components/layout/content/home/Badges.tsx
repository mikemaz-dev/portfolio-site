import { MapPin } from 'lucide-react'

import { AvailabilityBadge } from '@/ui/index'

export function Badges() {
	return (
		<div className='w-max flex max-sm:flex-col max-sm:items-start items-center gap-2.5 max-sm:gap-2 text-white/55 text-lg max-sm:text-sm'>
			<div className='flex items-center gap-1.5'>
				<MapPin className='text-white/68 size-4' />
				<span className='hover:text-white/70 transition-colors'>Poland</span>
			</div>
			<span className='text-white/65 max-sm:hidden'>/</span>
			<div className='bg-neutral-200/40 hidden w-full h-[1px] rounded-lg max-sm:block' />
			<AvailabilityBadge />
		</div>
	)
}
