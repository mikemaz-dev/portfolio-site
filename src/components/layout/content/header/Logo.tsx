import Link from 'next/link'

interface Props {}

export function Logo({}: Props) {
	return (
		<Link
			href='/'
			className='font-bold text-xl max-sm:text-lg hover:text-white/90 transition-colors'
		>
			Mikhail Mazurkevich
		</Link>
	)
}
