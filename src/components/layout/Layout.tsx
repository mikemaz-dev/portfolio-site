import type { PropsWithChildren } from 'react'

import { Providers } from '@/providers/Providers'

import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className=''>
			<Content>
				<Providers>{children}</Providers>
			</Content>
		</main>
	)
}
