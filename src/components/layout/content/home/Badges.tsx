import { CodeXml, MapPin } from 'lucide-react'

import { AvailabilityBadge } from '@/ui/index'

export function Badges() {
	return (
		<div className='w-max flex max-sm:flex-col max-sm:w-full max-sm:items-center items-center gap-2.5 mt-3.5 text-white/55 text-lg max-sm:text-sm'>
			<div className='flex items-center gap-2'>
				<div className='flex items-center gap-1.5'>
					<CodeXml className='text-white/68 max-sm:size-4' />
					<span className='hover:text-white/70 transition-colors'>Frontend Developer</span>
				</div>
				<span className='text-white/65'>/</span>
				<div className='flex items-center gap-1.5'>
					<MapPin className='text-white/68 size-4' />
					<span className='hover:text-white/70 transition-colors'>Poland</span>
				</div>
			</div>
			<span className='text-white/65 max-sm:hidden'>/</span>
			<AvailabilityBadge />
		</div>
	)
}
