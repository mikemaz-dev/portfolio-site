'use client'

import { type PropsWithChildren } from 'react'

export function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='px-20 pt-25 max-sm:px-5 max-sm:pt-15 relative'>
			<section className=''>{children}</section>
		</div>
	)
}
