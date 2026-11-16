'use client'

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { BrandMark } from './BrandMark'
import { LocaleLink } from './LocaleLink'
import { SoundToggle } from './SoundToggle'
import { pillDark, pillDot } from './styles'
import { CONTACTS, CONTENT, type Locale } from '@/data/site-content'

export function SiteHeader({ locale }: { locale: Locale }) {
	const headerRef = useRef<HTMLElement>(null)
	const menuRef = useRef<HTMLDetailsElement>(null)
	const menuButtonRef = useRef<HTMLElement>(null)
	const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('light')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('top')
	const copy = CONTENT[locale]
	const nextLocale = locale === 'en' ? 'ru' : 'en'
	const nextLocalePath = nextLocale === 'en' ? '/' : '/ru'

	const navItems = [
		{ href: '#about', label: copy.nav.about },
		{ href: '#work', label: copy.nav.work },
		{ href: '#experience', label: copy.nav.experience },
		{ href: '#awards', label: copy.nav.awards },
		{ href: '#learning', label: copy.nav.learning },
		{ href: '#reviews', label: copy.nav.reviews },
		{ href: '#contact', label: copy.nav.contact }
	]

	useEffect(() => {
		let frame = 0

		const updateTheme = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				const header = headerRef.current
				if (!header) return

				const sampleY = Math.min(
					window.innerHeight - 1,
					Math.ceil(header.getBoundingClientRect().bottom) + 24
				)
				const section = Array.from(
					document.querySelectorAll<HTMLElement>('[data-header-theme]')
				).find(element => {
					const rect = element.getBoundingClientRect()
					return rect.top <= sampleY && rect.bottom > sampleY
				})

				setHeaderTheme(section?.dataset.headerTheme === 'light' ? 'light' : 'dark')
				setActiveSection(section?.id ?? 'top')
			})
		}

		updateTheme()
		window.addEventListener('scroll', updateTheme, { passive: true })
		window.addEventListener('resize', updateTheme)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('scroll', updateTheme)
			window.removeEventListener('resize', updateTheme)
		}
	}, [])

	useEffect(() => {
		const menu = menuRef.current
		if (!isMenuOpen || !menu) return

		const desktop = window.matchMedia('(min-width: 1024px)')
		const dismissOutside = (event: PointerEvent) => {
			if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false
		}
		const dismissOnEscape = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || !menu.open) return
			event.preventDefault()
			menu.open = false
			menuButtonRef.current?.focus()
		}
		const dismissOnDesktop = (event: MediaQueryListEvent) => {
			if (event.matches) menu.open = false
		}

		document.addEventListener('pointerdown', dismissOutside)
		document.addEventListener('keydown', dismissOnEscape)
		desktop.addEventListener('change', dismissOnDesktop)

		return () => {
			document.removeEventListener('pointerdown', dismissOutside)
			document.removeEventListener('keydown', dismissOnEscape)
			desktop.removeEventListener('change', dismissOnDesktop)
		}
	}, [isMenuOpen])

	const closeMenu = () => {
		if (menuRef.current) menuRef.current.open = false
	}

	return (
		<header
			className='group/header pointer-events-none fixed inset-x-0 top-0 z-100 flex items-start justify-between gap-3 px-[clamp(16px,3.4vw,48px)] pt-[max(16px,env(safe-area-inset-top))]'
			data-theme={headerTheme}
			data-menu-open={isMenuOpen}
			ref={headerRef}
		>
			<a
				className='pointer-events-auto inline-flex min-h-11 items-center gap-2.5 rounded-full bg-chip/95 pr-5 pl-2 text-[17px] tracking-[-0.02em] whitespace-nowrap transition-colors duration-500 group-data-[theme=dark]/header:bg-[#22232c]/95 group-data-[theme=dark]/header:text-white max-sm:size-11 max-sm:justify-center max-sm:p-0'
				href='#top'
				aria-label={locale === 'ru' ? 'mikemaz-dev — на главную' : 'mikemaz-dev homepage'}
			>
				<BrandMark className='block size-7' />
				<span className='max-sm:sr-only'>mikemaz-dev</span>
			</a>

			<div className='pointer-events-auto flex shrink-0 items-center gap-2 max-sm:gap-1.5'>
				<LocaleLink
					href={nextLocalePath}
					hrefLang={nextLocale}
					label={`${locale.toUpperCase()} / ${nextLocale.toUpperCase()} — ${
						locale === 'ru' ? 'переключить на' : 'switch to'
					} ${CONTENT[nextLocale].langName}`}
				>
					<span aria-hidden='true'>{locale.toUpperCase()}</span>
					<span
						aria-hidden='true'
						className='opacity-40'
					>
						/
					</span>
					<strong className='font-normal opacity-40'>{nextLocale.toUpperCase()}</strong>
				</LocaleLink>
				<a
					className={`${pillDark} max-md:hidden`}
					href={CONTACTS.telegram}
					target='_blank'
					rel='noreferrer'
				>
					{copy.headerCta}
					<span
						className={pillDot}
						aria-hidden='true'
					/>
				</a>
				<SoundToggle locale={locale} />
				<details
					className='group/menu relative'
					ref={menuRef}
					onToggle={event => setIsMenuOpen(event.currentTarget.open)}
					onBlur={event => {
						if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
							closeMenu()
						}
					}}
				>
					<summary
						className='group/pill flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center gap-3 rounded-full bg-chip/95 px-5 text-[13px] tracking-[0.01em] uppercase transition-colors duration-500 select-none group-open/menu:bg-ink group-open/menu:text-white group-data-[theme=dark]/header:bg-[#22232c]/95 group-data-[theme=dark]/header:text-white hover:bg-ink hover:text-white max-sm:px-0'
						ref={menuButtonRef}
						aria-controls='site-menu'
						aria-label={
							isMenuOpen
								? locale === 'ru'
									? 'Закрыть меню'
									: 'Close menu'
								: locale === 'ru'
									? 'Меню'
									: 'Menu'
						}
					>
						{/* Both labels share one grid cell, so the button keeps the width of the longer
						    word and the header never jumps when the label switches. */}
						<span
							aria-hidden='true'
							className='grid overflow-hidden max-sm:hidden'
						>
							<span className='col-start-1 row-start-1 text-right transition-[opacity,translate] duration-500 ease-out-expo group-open/menu:-translate-y-full group-open/menu:opacity-0'>
								{locale === 'ru' ? 'Меню' : 'Menu'}
							</span>
							<span className='col-start-1 row-start-1 translate-y-full text-right opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-open/menu:translate-y-0 group-open/menu:opacity-100'>
								{locale === 'ru' ? 'Закрыть' : 'Close'}
							</span>
						</span>
						<span
							className='flex gap-1 transition-transform duration-500 ease-out-expo group-open/menu:rotate-90'
							aria-hidden='true'
						>
							<span className='size-1.5 rounded-full bg-current' />
							<span className='size-1.5 rounded-full bg-current' />
						</span>
					</summary>
					<nav
						className='absolute top-[calc(100%+8px)] right-0 max-h-[calc(100dvh-90px)] w-[min(440px,calc(100vw-32px))] overflow-y-auto overscroll-y-contain rounded-[20px] bg-white p-2 text-ink shadow-[0_30px_80px_-30px_rgb(8_8_12/35%)] motion-safe:animate-menu-in'
						id='site-menu'
						aria-label={locale === 'ru' ? 'Навигация по сайту' : 'Site navigation'}
					>
						{navItems.map((item, index) => (
							<a
								className='group/item flex min-h-14 items-baseline gap-4 rounded-[14px] px-4 py-2 text-[clamp(1.5rem,3vw,2rem)] leading-tight tracking-[-0.025em] transition-colors duration-300 hover:bg-paper aria-[current=location]:text-accent motion-safe:animate-fade-in'
								href={item.href}
								key={item.href}
								aria-current={item.href === `#${activeSection}` ? 'location' : undefined}
								onClick={closeMenu}
								style={{ animationDelay: `${80 + index * 40}ms` }}
							>
								<span className='w-6 text-[12px] tracking-normal text-muted tabular-nums'>
									{String(index + 1).padStart(2, '0')}
								</span>
								{item.label}
							</a>
						))}
						<a
							href={CONTACTS.telegram}
							className={`${pillDark} mt-2 flex w-full justify-between`}
							target='_blank'
							rel='noreferrer'
							onClick={closeMenu}
						>
							{copy.headerCta}
							<ArrowUpRight
								aria-hidden='true'
								size={16}
							/>
						</a>
					</nav>
				</details>
			</div>
		</header>
	)
}
