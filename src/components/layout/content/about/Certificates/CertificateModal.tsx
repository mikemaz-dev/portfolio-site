'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/ui/index'

type Props = {
	pdfLink: string
	name: string
	onClose: () => void
}

export const CertificateModal: React.FC<Props> = ({ pdfLink, name, onClose }) => {
	const [isLoading, setIsLoading] = useState(true)

	// Закрытие по ESC
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	// Блокировка скролла
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className='relative h-[80vh] w-full max-w-4xl overflow-hidden rounded-xl bg-neutral-900 shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				{isLoading && (
					<div className='absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
						<div className='h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-white'></div>
					</div>
				)}

				<iframe
					src={pdfLink}
					className='h-full w-full border-0'
					onLoad={() => setIsLoading(false)}
					title={name}
				/>

				<div className='absolute top-3 flex w-full justify-center self-end'>
					<Button
						variant='primary'
						onClick={onClose}
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	)
}
