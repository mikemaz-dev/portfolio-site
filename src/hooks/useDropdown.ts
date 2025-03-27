'use client'

import { useEffect, useRef, useState } from 'react'

export function useDropdown() {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	const toggleDropdown = (id: string) => setOpenDropdown(prev => (prev === id ? null : id))
	const isDropdownOpen = (id: string) => openDropdown === id

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!dropdownRef.current) return
			if (!dropdownRef.current.contains(e.target as Node)) {
				setOpenDropdown(null)
			}
		}

		window.addEventListener('click', handleClickOutside)

		return () => {
			window.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return { openDropdown, setOpenDropdown, toggleDropdown, dropdownRef, isDropdownOpen }
}
