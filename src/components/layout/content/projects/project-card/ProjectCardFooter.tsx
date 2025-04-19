import { Globe } from 'lucide-react'
import * as m from 'motion/react-m'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/ui/Button'

import { DifficultyBadge } from '../DifficultBadge'

import type { Difficulties } from '@/data/projects/project.types'

export function ProjectCardFooter({
	livelink,
	githubLink,
	difficult
}: {
	livelink: string
	githubLink: string
	difficult: keyof typeof Difficulties
}) {
	return (
		<m.div
			className='flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, delay: 0.35 }}
		>
			{(livelink || githubLink) && (
				<div className='flex items-center gap-3.5'>
					{livelink && (
						<Link
							href={livelink}
							target='_blank'
							rel='noopener noreferrer'
						>
							<m.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									variant='primary'
									minimalistic
									className='flex items-center gap-1.5'
								>
									<m.div
										animate={{ rotate: [0, 15, -15, 0] }}
										transition={{
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											repeatDelay: 5
										}}
									>
										<Globe className='size-5' />
									</m.div>
									Live demo
								</Button>
							</m.div>
						</Link>
					)}
					{githubLink && (
						<Link
							href={githubLink}
							target='_blank'
							rel='noopener noreferrer'
						>
							<m.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button
									variant='secondary'
									minimalistic
									className='flex items-center gap-1.5'
								>
									<m.div
										whileHover={{ rotate: 360 }}
										transition={{ duration: 0.4 }}
									>
										<Image
											src='/icons/github-new.svg'
											alt='Github'
											width={20}
											height={20}
										/>
									</m.div>
									More info
								</Button>
							</m.div>
						</Link>
					)}
				</div>
			)}
			{difficult && (
				<m.div
					className='flex items-center'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.2, delay: 0.4 }}
				>
					<DifficultyBadge difficulty={difficult} />
				</m.div>
			)}
		</m.div>
	)
}
