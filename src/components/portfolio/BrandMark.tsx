export function BrandMark({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden='true'
			className={className}
			fill='none'
			viewBox='0 0 512 512'
		>
			<path
				d='M84 374V132L236 294L388 132V348'
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='46'
			/>
			<path
				d='M348 400H432'
				stroke='var(--cobalt)'
				strokeLinecap='round'
				strokeWidth='28'
			/>
		</svg>
	)
}
