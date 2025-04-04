'use client'

import { type PropsWithChildren } from 'react'

import { Header } from './header/Header'

export function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='w-full relative'>
			<Header />
			<section className='px-20 max-sm:px-10'>{children}</section>
		</div>
	)
}
