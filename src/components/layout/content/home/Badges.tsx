import { MapPin } from 'lucide-react'

import { AvailabilityBadge } from '@/ui/index'

export function Badges() {
	return (
		<div className='flex w-max items-center gap-2.5 text-lg text-white/55 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:text-sm'>
			<div className='flex items-center gap-1.5'>
				<MapPin className='size-4 text-white/68' />
				<span className='transition-colors hover:text-white/70'>Poland</span>
			</div>
			<span className='text-white/65 max-sm:hidden'>/</span>
			<div className='hidden h-[1px] w-full rounded-lg bg-neutral-200/40 max-sm:block' />
			<AvailabilityBadge />
		</div>
	)
}
