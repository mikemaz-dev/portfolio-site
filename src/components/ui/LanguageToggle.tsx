'use client'

import cn from 'clsx'

import { useLanguage } from '@/providers/LanguageProvider'

import type { Language } from '@/data/site-copy.data'

const languages: Array<{ label: string; value: Language }> = [
	{ label: 'EN', value: 'en' },
	{ label: 'RU', value: 'ru' }
]

export function LanguageToggle({
	light = false,
	compact = false
}: {
	light?: boolean
	compact?: boolean
}) {
	const { language, setLanguage } = useLanguage()

	return (
		<div
			aria-label='Language switcher'
			className={cn(
				'inline-flex rounded-full border p-1 shadow-sm backdrop-blur-xl',
				light ? 'border-slate-200 bg-white/90' : 'border-white/15 bg-white/10',
				compact && 'scale-90'
			)}
			role='group'
		>
			{languages.map(item => {
				const active = item.value === language

				return (
					<button
						aria-pressed={active}
						className={cn(
							'rounded-full text-xs font-bold tracking-[0.18em] transition-all duration-300',
							compact ? 'px-2.5 py-1.5' : 'px-3 py-1.5',
							active
								? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
								: light
									? 'text-slate-500 hover:text-slate-950'
									: 'text-slate-300 hover:text-white'
						)}
						key={item.value}
						onClick={() => setLanguage(item.value)}
						type='button'
					>
						{item.label}
					</button>
				)
			})}
		</div>
	)
}
