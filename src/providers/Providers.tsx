'use client'

import { LazyMotion, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'

import { LanguageProvider } from './LanguageProvider'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<LazyMotion features={domAnimation}>
			<LanguageProvider>{children}</LanguageProvider>
		</LazyMotion>
	)
}
