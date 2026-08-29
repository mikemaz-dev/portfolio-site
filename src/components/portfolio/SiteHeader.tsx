'use client'

import { Menu, X } from 'lucide-react'
import { type MouseEvent, useEffect, useRef, useState } from 'react'

import { BrandMark } from './BrandMark'
import { LocaleLink } from './LocaleLink'
import { CONTACTS, CONTENT, type Locale } from '@/data/site-content'

export function SiteHeader({ locale }: { locale: Locale }) {
	const headerRef = useRef<HTMLElement>(null)
	const menuRef = useRef<HTMLDetailsElement>(null)
	const previousBodyOverflowRef = useRef('')
	const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('dark')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const copy = CONTENT[locale]
	const nextLocale = locale === 'en' ? 'ru' : 'en'
	const nextLocalePath = nextLocale === 'en' ? '/' : '/ru'

	const navItems = [
		{ href: '#about', label: copy.nav.about },
		{ href: '#experience', label: copy.nav.experience },
		{ href: '#learning', label: copy.nav.learning },
		{ href: '#work', label: copy.nav.work },
		{ href: '#reviews', label: copy.nav.reviews },
		{ href: '#contact', label: copy.nav.contact }
	]
	const desktopNavItems = navItems.filter(item =>
		['#about', '#experience', '#learning', '#work', '#contact'].includes(item.href)
	)

	useEffect(() => {
		let frame = 0

		const updateTheme = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(() => {
				const header = headerRef.current
				if (!header) return

				const sampleY = Math.min(
					window.innerHeight - 1,
					Math.ceil(header.getBoundingClientRect().bottom) + 4
				)
				const section = Array.from(
					document.querySelectorAll<HTMLElement>('[data-header-theme]')
				).find(element => {
					const rect = element.getBoundingClientRect()
					return rect.top <= sampleY && rect.bottom > sampleY
				})

				setHeaderTheme(section?.dataset.headerTheme === 'light' ? 'light' : 'dark')
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
		if (!isMenuOpen) return

		previousBodyOverflowRef.current = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = previousBodyOverflowRef.current
		}
	}, [isMenuOpen])

	const closeMenu = () => {
		menuRef.current?.removeAttribute('open')
		document.body.style.overflow = previousBodyOverflowRef.current
		setIsMenuOpen(false)
	}

	const navigateFromMenu = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		const hash = event.currentTarget.hash
		const target = document.querySelector<HTMLElement>(hash)

		closeMenu()
		if (!target) return

		window.requestAnimationFrame(() => {
			window.scrollTo({
				behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
				top: target.getBoundingClientRect().top + window.scrollY
			})
			window.history.pushState(null, '', hash)
		})
	}

	return (
		<header
			className='site-header'
			data-theme={isMenuOpen ? 'dark' : headerTheme}
			data-menu-open={isMenuOpen}
			ref={headerRef}
		>
			<a
				className='brand-mark'
				href='#top'
				aria-label={locale === 'ru' ? 'mikemaz-dev — на главную' : 'mikemaz-dev homepage'}
				onClick={isMenuOpen ? navigateFromMenu : undefined}
			>
				<BrandMark className='brand-mark-icon' />
			</a>

			<nav
				className='desktop-nav'
				aria-label={locale === 'ru' ? 'Основная навигация' : 'Primary navigation'}
			>
				{desktopNavItems.map(item => (
					<a
						href={item.href}
						key={item.href}
					>
						{item.label}
					</a>
				))}
			</nav>

			<div className='header-actions'>
				<LocaleLink
					href={nextLocalePath}
					hrefLang={nextLocale}
					label={`${locale.toUpperCase()} / ${nextLocale.toUpperCase()} — ${
						locale === 'ru' ? 'переключить на' : 'switch to'
					} ${CONTENT[nextLocale].langName}`}
				>
					<span aria-hidden='true'>{locale.toUpperCase()}</span>
					<span aria-hidden='true'>/</span>
					<strong>{nextLocale.toUpperCase()}</strong>
				</LocaleLink>
				<a
					className='header-contact'
					href={CONTACTS.telegram}
					target='_blank'
					rel='noreferrer'
				>
					{copy.headerCta}
				</a>
				<details
					className='mobile-menu'
					ref={menuRef}
					onToggle={event => setIsMenuOpen(event.currentTarget.open)}
				>
					<summary
						className='menu-button'
						aria-label={
							isMenuOpen
								? locale === 'ru'
									? 'Закрыть навигацию'
									: 'Close navigation'
								: locale === 'ru'
									? 'Открыть навигацию'
									: 'Open navigation'
						}
					>
						<span className='menu-icon-open'>
							<Menu
								aria-hidden='true'
								size={22}
							/>
						</span>
						<span className='menu-icon-close'>
							<X
								aria-hidden='true'
								size={22}
							/>
						</span>
					</summary>
					<nav
						className='mobile-nav'
						id='mobile-navigation'
						aria-label={locale === 'ru' ? 'Мобильная навигация' : 'Mobile navigation'}
					>
						{navItems.map(item => (
							<a
								href={item.href}
								key={item.href}
								onClick={navigateFromMenu}
							>
								{item.label}
							</a>
						))}
						<a
							href={CONTACTS.telegram}
							target='_blank'
							rel='noreferrer'
							onClick={closeMenu}
						>
							{copy.headerCta}
						</a>
					</nav>
				</details>
			</div>
		</header>
	)
}
