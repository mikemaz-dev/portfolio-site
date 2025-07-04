import { ExternalLink } from 'lucide-react'
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
		<div className='flex flex-col gap-4 max-sm:mt-2'>
			<hr className='text-neutral-700/80' />
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
								aria-label={`Visit project live demo`}
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
											<ExternalLink className='size-5' />
										</m.div>
										Website
									</Button>
								</m.div>
							</Link>
						)}
						{githubLink && (
							<Link
								href={githubLink}
								target='_blank'
								aria-label={`Visit project github`}
							>
								<Button
									variant='secondary'
									minimalistic
									className='flex items-center gap-1.5'
								>
									<Image
										src='/icons/github-new.svg'
										alt='Github'
										width={20}
										height={20}
									/>
									More info
								</Button>
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
		</div>
	)
}
