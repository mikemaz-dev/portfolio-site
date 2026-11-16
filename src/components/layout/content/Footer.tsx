'use client'

import { Github, Mail, MessageCircle, ShoppingBag } from 'lucide-react'

import { useLanguage } from '@/providers/LanguageProvider'

import { SITE_COPY } from '@/data/site-copy.data'
import { CONTACTS } from '@/data/site.data'

export function Footer() {
	const { language } = useLanguage()
	const copy = SITE_COPY[language]

	return (
		<footer className='bg-slate-950 px-6 py-10 text-white md:px-10'>
			<div className='mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between'>
				<div>
					<p className='text-xl font-semibold'>Mike Mazur</p>
					<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>{copy.footer.text}</p>
				</div>
				<nav className='flex flex-wrap gap-4 text-sm text-slate-400'>
					{copy.nav.map(item => (
						<a
							className='hover:text-white'
							href={item.href}
							key={item.name}
						>
							{item.name}
						</a>
					))}
				</nav>
				<div className='flex gap-3'>
					<a
						className='footer-icon'
						href={CONTACTS.telegram}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Telegram'
					>
						<MessageCircle size={18} />
					</a>
					<a
						className='footer-icon'
						href={CONTACTS.kwork}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='Kwork'
					>
						<ShoppingBag size={18} />
					</a>
					<a
						className='footer-icon'
						href={`mailto:${CONTACTS.email}`}
						aria-label='Email'
					>
						<Mail size={18} />
					</a>
					<a
						className='footer-icon'
						href={CONTACTS.github}
						rel='noopener noreferrer'
						target='_blank'
						aria-label='GitHub'
					>
						<Github size={18} />
					</a>
				</div>
			</div>
			<div className='mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-500'>
				© {new Date().getFullYear()} Mike Mazur. {copy.footer.built}
			</div>
		</footer>
	)
}
