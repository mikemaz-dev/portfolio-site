import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
	return (
		<Link
			href='/'
			className=''
		>
			<Image
				src='/logos/logo_github-40.png'
				alt='Logo'
				width='45'
				height='45'
				className='fixed top-6 left-[15px] z-50 transition-transform duration-300 hover:scale-105'
			/>
		</Link>
	)
}
