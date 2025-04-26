
export function AvailabilityBadge() {
	return (
		<div className='flex items-center gap-2 rounded-lg transition-colors duration-300'>
			<div className="size-2.5 rounded-full bg-emerald-400 group-hover:bg-emerald-300 transition-colors duration-300 shadow-sm" />
			<span className='text-white/70 hover:text-white/80 group-hover:text-white transition-colors duration-300'>
				Available for work
			</span>
		</div>
	)
}
