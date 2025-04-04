import { CodeXml, MapPin } from 'lucide-react'

export function Badges() {
	return (
		<div className='flex items-center gap-2.5 mt-4 text-white/55 text-lg'>
			<div className='flex items-center gap-1.5'>
				<CodeXml className='text-white/68' />
				<span className='hover:text-white/70 transition-colors'>Frontend Developer</span>
			</div>
			<span className='text-white/65'>/</span>
			<div className='flex items-center gap-1.5'>
				<MapPin className='size-5 text-white/68' />
				<span className='hover:text-white/70 transition-colors'>Poland</span>
			</div>
		</div>
	)
}
