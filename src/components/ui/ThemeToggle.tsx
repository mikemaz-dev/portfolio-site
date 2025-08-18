'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])
	
	if (!mounted) return null
	
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}
	
	return (
		<label className="relative inline-block w-14 h-8 cursor-pointer">
			<input
				type="checkbox"
				checked={theme === 'dark'}
				onChange={toggleTheme}
				className="sr-only"
			/>
			<span className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-500"></span>
			<span className="absolute left-1 top-1 w-6 h-6 bg-white dark:bg-yellow-300 rounded-full transition-transform duration-500 transform dark:translate-x-6 shadow-md"></span>
			<span className="absolute right-2 top-2 w-1 h-1 rounded-full bg-yellow-300 dark:bg-white shadow-sm transition-all duration-500"></span>
		</label>
	)
}
