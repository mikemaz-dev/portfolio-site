'use client'

import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import type { Language } from '@/data/site-copy.data'

type LanguageContextValue = {
	language: Language
	setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: PropsWithChildren) {
	const [language, setLanguageState] = useState<Language>('en')

	useEffect(() => {
		const saved = window.localStorage.getItem('portfolio-language')

		if (saved === 'ru' || saved === 'en') {
			setLanguageState(saved)
		}
	}, [])

	const setLanguage = (nextLanguage: Language) => {
		setLanguageState(nextLanguage)
		window.localStorage.setItem('portfolio-language', nextLanguage)
		document.documentElement.lang = nextLanguage
	}

	useEffect(() => {
		document.documentElement.lang = language
	}, [language])

	const value = useMemo(() => ({ language, setLanguage }), [language])

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
	const context = useContext(LanguageContext)

	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider')
	}

	return context
}
