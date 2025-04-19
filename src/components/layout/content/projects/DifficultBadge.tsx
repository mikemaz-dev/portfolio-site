import { CircleDot } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import type { Difficulties } from '@/data/projects/project.types'

export interface DifficultyBadgeProps {
	difficulty: keyof typeof Difficulties
}

const difficultyClassMap: Record<string, string> = {
	Beginner: 'bg-green-700/30 text-green-400',
	Intermediate: 'bg-yellow-700/30 text-yellow-400',
	Advanced: 'bg-red-700/30 text-red-400',
	Expert: 'bg-purple-700/30 text-purple-400'
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
	return (
		<span
			className={twMerge(
				'flex items-center gap-1 self-start rounded-full px-2.5 py-1.5 text-xs font-semibold',
				difficultyClassMap[difficulty] ?? 'bg-neutral-700/30 text-neutral-400'
			)}
		>
			<CircleDot className='w-3.5 h-3.5' />
			{difficulty}
		</span>
	)
}
