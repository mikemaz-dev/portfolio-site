import { LazyMotion, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
