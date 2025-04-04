import type { PropsWithChildren } from 'react'

import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className=''>
			<Content>{children}</Content>
		</main>
	)
}
