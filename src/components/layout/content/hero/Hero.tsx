'use client'

import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react'
import * as m from 'motion/react-m'
import { useRef } from 'react'

import { useLanguage } from '@/providers/LanguageProvider'

import { SITE_COPY } from '@/data/site-copy.data'
import { CONTACTS } from '@/data/site.data'

const floatingCardPositions = [
	'left-4 top-12 rotate-[-8deg]',
	'right-6 top-20 rotate-[6deg]',
	'bottom-24 left-10 rotate-[5deg]',
	'bottom-10 right-10 rotate-[-6deg]'
]

export function Hero() {
	const { language } = useLanguage()
	const copy = SITE_COPY[language]
	const chipConstraintsRef = useRef<HTMLDivElement>(null)

	return (
		<section
			className='relative isolate overflow-hidden rounded-b-[2.5rem] bg-slate-950 px-6 pt-28 pb-16 text-white md:px-10 md:pt-36 md:pb-24'
			id='home'
		>
			<div className='hero-glow' />
			<div
				className='hero-aurora'
				aria-hidden='true'
			>
				<span />
				<span />
				<span />
			</div>
			<div
				className='hero-lines'
				aria-hidden='true'
			>
				<span />
				<span />
				<span />
				<span />
				<span />
			</div>
			<div
				className='hero-orbit-grid'
				aria-hidden='true'
			/>
			<div className='mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center'>
				<m.div
					animate={{ opacity: 1, y: 0 }}
					className='relative z-10'
					initial={{ opacity: 0, y: 24 }}
					transition={{ duration: 0.55 }}
					key={language}
				>
					<p className='mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200'>
						{copy.hero.badge}
					</p>
					<h1 className='max-w-5xl text-5xl leading-[0.98] font-semibold tracking-[-0.04em] md:text-7xl xl:text-8xl'>
						{copy.hero.title}
					</h1>
					<p className='mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl'>
						{copy.hero.text}
					</p>
					<div className='mt-9 flex flex-col gap-3 sm:flex-row'>
						<a
							className='primary-btn'
							href={CONTACTS.telegram}
							rel='noopener noreferrer'
							target='_blank'
						>
							<MessageCircle size={18} />
							{copy.cta}
						</a>
						<a
							className='secondary-btn dark'
							href='#projects'
						>
							{copy.hero.viewWork}
							<ArrowDown size={18} />
						</a>
					</div>
				</m.div>

				<m.div
					animate={{ opacity: 1, scale: 1 }}
					className='relative min-h-[420px] rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-blue-600/10'
					initial={{ opacity: 0, scale: 0.96 }}
					transition={{ delay: 0.15, duration: 0.55 }}
				>
					<div className='absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:44px_44px]' />
					<div
						className='relative flex h-full min-h-[380px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80'
						ref={chipConstraintsRef}
					>
						<div className='absolute h-72 w-72 rounded-full border border-blue-400/20' />
						<div className='absolute h-96 w-96 rounded-full border border-blue-400/10' />
						<div className='absolute h-[30rem] w-[30rem] rounded-full border border-blue-400/5' />
						<div className='relative z-10 max-w-xs rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur'>
							<p className='text-sm text-blue-200'>{copy.hero.cardLabel}</p>
							<h2 className='mt-4 text-3xl leading-tight font-semibold'>{copy.hero.cardTitle}</h2>
							<div className='mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300'>
								{copy.hero.badges.map((item, index) => (
									<m.span
										className='cursor-grab rounded-2xl bg-white/10 p-3 active:cursor-grabbing'
										drag
										dragConstraints={chipConstraintsRef}
										dragElastic={0.08}
										key={item}
										whileDrag={{ scale: 1.06, zIndex: 40 }}
										whileHover={{ y: -2 }}
										transition={{ type: 'spring', stiffness: 260, damping: 22 }}
										style={{ rotate: index % 2 === 0 ? -1 : 1 }}
									>
										{item}
									</m.span>
								))}
							</div>
						</div>
						{copy.hero.floating.map((label, index) => (
							<span
								className={`floating-card ${floatingCardPositions[index]}`}
								key={label}
							>
								{label}
								<ArrowUpRight size={14} />
							</span>
						))}
					</div>
				</m.div>
			</div>
		</section>
	)
}
