import type { Experience, Locale } from '@/data/site-content'

const MONTHS_IN_YEAR = 12

function toMonthIndex(value: string) {
	const [year, month] = value.split('-').map(Number)
	return year * MONTHS_IN_YEAR + month - 1
}

function currentMonthIndex(now: Date) {
	return now.getUTCFullYear() * MONTHS_IN_YEAR + now.getUTCMonth()
}

export function getTotalExperienceMonths(experience: Experience[], now = new Date()) {
	const coveredMonths = new Set<number>()
	const currentMonth = currentMonthIndex(now)

	experience.forEach(item => {
		const start = toMonthIndex(item.start)
		const end = Math.min(item.end ? toMonthIndex(item.end) : currentMonth, currentMonth)

		for (let month = start; month <= end; month += 1) {
			coveredMonths.add(month)
		}
	})

	return coveredMonths.size
}

function pluralRu(value: number, forms: [string, string, string]) {
	const normalized = Math.abs(value) % 100
	const lastDigit = normalized % 10

	if (normalized > 10 && normalized < 20) return forms[2]
	if (lastDigit === 1) return forms[0]
	if (lastDigit > 1 && lastDigit < 5) return forms[1]
	return forms[2]
}

export function formatExperienceDuration(months: number, locale: Locale) {
	const years = Math.floor(months / MONTHS_IN_YEAR)
	const remainingMonths = months % MONTHS_IN_YEAR

	if (locale === 'en') {
		const parts = [
			years ? `${years} ${years === 1 ? 'year' : 'years'}` : '',
			remainingMonths ? `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : ''
		].filter(Boolean)

		return parts.join(' ')
	}

	const parts = [
		years ? `${years} ${pluralRu(years, ['год', 'года', 'лет'])}` : '',
		remainingMonths
			? `${remainingMonths} ${pluralRu(remainingMonths, ['месяц', 'месяца', 'месяцев'])}`
			: ''
	].filter(Boolean)

	return parts.join(' ')
}
