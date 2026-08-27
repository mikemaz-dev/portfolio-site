import { PortfolioPage } from '@/components/portfolio/PortfolioPage'

export const revalidate = 86400

export default function RussianHomePage() {
	return <PortfolioPage locale='ru' />
}
