import { twMerge } from 'tailwind-merge'

import { TechStackItem } from './TechStackItem'

import { TECHS_DATA } from '@/data/techs/techs.data'

interface TechStackProps {
	exclude?: string[]
	className?: string
	itemClassname?: string
	variant?: 'big' | 'small'
}

export function TechStack({
	exclude = [],
	className = '',
	itemClassname = '',
	variant
}: TechStackProps) {
	const filteredTechs = TECHS_DATA.filter(tech => !exclude.includes(tech.name))

	return (
		<div>
			<div className=''>
				<div
					className={twMerge(
						'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8',
						itemClassname
					)}
				>
					{filteredTechs.map((tech, i) => (
						<TechStackItem
							key={i}
							tech={tech}
							className={itemClassname}
							variant={variant}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
