import type { PropsWithChildren } from 'react'

import { Header } from './header/Header'

interface Props {}

export function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='w-full relative'>
			<Header />
			<section>{children}</section>
		</div>
	)
}
