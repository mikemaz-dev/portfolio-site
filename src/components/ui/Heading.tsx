export function Heading({ title }: { title: string }) {
	return (
		<div>
			<hr className='w-22 mb-4 text-neutral-200/40' />
			<h3 className='text-3xl max-sm:text-2xl font-bold text-white'>{title}</h3>
		</div>
	)
}
