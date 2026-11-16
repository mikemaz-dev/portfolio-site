import { Button } from '@/ui/Button'

export function DownloadCVButton() {
	const handleClick = () => {
		window.open(
			'https://drive.google.com/file/d/1fdKRpoG-8q8AcfSp9eI_LycmmB1aVnoK/preview?usp=drive_link',
			'_blank',
			'noopener,noreferrer'
		)
	}

	return (
		<Button
			variant='outline'
			onClick={handleClick}
			className='w-max'
		>
			Download CV
		</Button>
	)
}
