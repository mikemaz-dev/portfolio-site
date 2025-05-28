import type { PropsWithChildren } from 'react'

import { Content } from './content/Content'

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main>
			<Content>{children}</Content>
		</main>
	)
}
