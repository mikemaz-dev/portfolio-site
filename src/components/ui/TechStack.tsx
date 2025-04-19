import { TechStackItem } from './TechStackItem'
import { TECHS_DATA } from '@/data/techs/techs.data'

interface TechStackProps {
	exclude?: string[]
	className?: string
	itemClassname?: string
}

export function TechStack({ exclude = [], className = '', itemClassname = '' }: TechStackProps) {
	const filteredTechs = TECHS_DATA.filter(tech => !exclude.includes(tech.name))

	return (
		<div className={`flex flex-wrap gap-2 sm:gap-3 ${className}`}>
			{filteredTechs.map((tech, i) => (
				<TechStackItem
					tech={tech}
					key={i}
					className={itemClassname}
				/>
			))}
		</div>
	)
}
