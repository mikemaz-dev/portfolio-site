export type Locale = 'en' | 'ru'

export type LocalizedText = Record<Locale, string>

export type Project = {
	title: string
	kind: LocalizedText
	description: LocalizedText
	image: string
	tech: string[]
	liveUrl: string
	sourceUrl: string
}

export type Review = {
	author: string
	original: string
	translation: string
}

export type Experience = {
	role: LocalizedText
	company: string
	start: string
	end?: string
	period: LocalizedText
	points: Record<Locale, string[]>
}

export type Certificate = {
	title: LocalizedText
	provider: string
	period: LocalizedText
	certificateUrl: string
	courseUrl?: string
	learning: Record<Locale, string[]>
}

export type SocialLink = {
	label: string
	href: string
}

export const SITE_URL = 'https://mikemaz-portfolio.vercel.app'

export const CONTACTS = {
	email: 'mazurkevich.mikhail.14@gmail.com',
	telegram: 'https://t.me/mazdev_14',
	linkedin: 'https://www.linkedin.com/in/mike-mazurkevich/',
	github: 'https://github.com/mikemaz-dev',
	cv: 'https://drive.google.com/file/d/1KkJd2WcG_X0RMc1qe2JTw4hZEEMvN2V8/view?usp=sharing'
} as const

export const SOCIAL_LINKS: SocialLink[] = [
	{ label: 'Telegram', href: CONTACTS.telegram },
	{ label: 'LinkedIn', href: CONTACTS.linkedin },
	{ label: 'GitHub', href: CONTACTS.github }
]

export const PROJECTS: Project[] = [
	{
		title: 'TaskHub',
		kind: {
			en: 'Productivity web app',
			ru: 'Веб-приложение для продуктивности'
		},
		description: {
			en: 'A focused task management product with a clear dashboard, reusable interface patterns and thoughtful responsive behaviour.',
			ru: 'Приложение для управления задачами с понятным dashboard, переиспользуемыми UI-паттернами и продуманным адаптивом.'
		},
		image: '/wip_screen/taskhub.png',
		tech: ['Next.js', 'TypeScript', 'Supabase', 'Zustand'],
		liveUrl: 'https://taskhub-green.vercel.app/',
		sourceUrl: 'https://github.com/mikemaz-dev/taskhub'
	},
	{
		title: 'NextPizza',
		kind: {
			en: 'Full-stack commerce app',
			ru: 'Full-stack приложение для заказов'
		},
		description: {
			en: 'A pizza ordering experience with catalogue, cart, authentication and a complete purchase flow across desktop and mobile.',
			ru: 'Сервис заказа пиццы с каталогом, корзиной, авторизацией и полным пользовательским сценарием на desktop и mobile.'
		},
		image: '/wip_screen/next-pizza.png',
		tech: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth'],
		liveUrl: 'https://next-pizza-7zt4-nine.vercel.app/',
		sourceUrl: 'https://github.com/mikemaz-dev/next-pizza'
	},
	{
		title: 'JustBank',
		kind: {
			en: 'Finance interface',
			ru: 'Финансовый интерфейс'
		},
		description: {
			en: 'A restrained banking interface for transactions, statistics and account actions with a strong information hierarchy.',
			ru: 'Сдержанный банковский интерфейс для транзакций, статистики и операций с чёткой визуальной иерархией.'
		},
		image: '/wip_screen/justbank.png',
		tech: ['JavaScript', 'Sass', 'Webpack', 'REST API'],
		liveUrl: 'https://justbank.vercel.app/',
		sourceUrl: 'https://github.com/mikemaz-dev/justbank'
	}
]

export const REVIEWS: Review[] = [
	{
		author: 'AlexeyProkopev',
		original: 'Все отлично! Работа выполнена оперативно и на высоком уровне, все правки учтены!',
		translation:
			'Everything was great. The work was completed quickly and to a high standard, and every requested change was addressed.'
	},
	{
		author: 'Evgeniy_V1',
		original:
			'Большая благодарность Михаилу за ответственный подход! Человек, на чье слово можно положиться! )',
		translation:
			'Many thanks to Mikhail for his responsible approach. He is someone you can rely on and trust to keep his word.'
	},
	{
		author: 'Astrix',
		original: 'Как всегда быстро и оперативно, спасибо!',
		translation: 'Fast and efficient as always. Thank you!'
	},
	{
		author: 'Astrix',
		original:
			'Cделано все четко, оперативно, все правки внесены, работой доволен. Однозначно буду работать с исполнителем. Рекомендую!',
		translation:
			'Everything was done clearly and quickly, all requested changes were made, and I am happy with the work. I will definitely work with this developer again. Recommended!'
	}
]

export const EXPERIENCE: Experience[] = [
	{
		role: {
			en: 'Freelance frontend developer',
			ru: 'Фриланс frontend-разработчик'
		},
		company: 'Freelance / Kwork',
		start: '2026-04',
		period: {
			en: '04/2026 — present',
			ru: '04/2026 — настоящее время'
		},
		points: {
			en: [
				'Build responsive Tilda websites from Figma designs.',
				'Extend projects with HTML, CSS and JavaScript, including forms and interactive behaviour.',
				'Clarify requirements, estimate tasks, test the result and deliver completed work to clients.',
				'Use Git, pull requests and code review practices while keeping the code clean and readable.'
			],
			ru: [
				'Разрабатываю адаптивные сайты на Tilda по макетам Figma.',
				'Дорабатываю проекты с помощью HTML, CSS и JavaScript, реализую формы и интерактивную логику.',
				'Анализирую требования, оцениваю задачи, тестирую результат и сдаю проект заказчику.',
				'Работал с Git, pull request и code review, применял принципы чистого кода.'
			]
		}
	},
	{
		role: {
			en: 'Frontend developer intern',
			ru: 'Стажёр frontend-разработчик'
		},
		company: 'Itransition Group',
		start: '2026-01',
		end: '2026-03',
		period: {
			en: '01/2026 — 03/2026',
			ru: '01/2026 — 03/2026'
		},
		points: {
			en: [
				'Built two web applications with React, Next.js, TypeScript and REST APIs.',
				'Created reusable components and set up state management and data handling.'
			],
			ru: [
				'Разработал 2 веб-приложения с использованием React, Next.js, TypeScript и REST API.',
				'Создавал переиспользуемые компоненты, настраивал управление состоянием и обработку данных.'
			]
		}
	}
]

export const EDUCATION = {
	institution: {
		en: 'Grodno State College of Technology and Design',
		ru: 'Гродненский государственный колледж техники, технологий и дизайна'
	},
	status: {
		en: 'Second year',
		ru: 'Техник-программист | 2 курс'
	}
} satisfies Record<'institution' | 'status', LocalizedText>

export const CERTIFICATES: Certificate[] = [
	{
		title: {
			en: 'Frontend Development Internship',
			ru: 'Стажировка по frontend-разработке'
		},
		provider: 'Itransition Group',
		period: { en: 'January — March 2026', ru: 'Январь — март 2026' },
		certificateUrl:
			'https://drive.google.com/file/d/1Jj1PLehztjmbNtmzoIyABmMxpxc1Sami/view?usp=sharing',
		learning: {
			en: [
				'Built two web applications with React, Next.js, TypeScript and REST APIs.',
				'Created reusable UI components and structured application pages around them.',
				'Set up state management and handled API data across the interfaces.'
			],
			ru: [
				'Разработал два веб-приложения на React, Next.js и TypeScript с использованием REST API.',
				'Создавал переиспользуемые UI-компоненты и выстраивал на их основе страницы приложений.',
				'Настраивал управление состоянием и обработку данных API в интерфейсах.'
			]
		}
	},
	{
		title: {
			en: 'RED Summer frontend marathon',
			ru: 'Frontend-марафон RED Summer'
		},
		provider: 'RED Group',
		period: { en: 'Summer 2025', ru: 'Лето 2025' },
		certificateUrl:
			'https://drive.google.com/file/d/1mh2Y8VjMxaiIQCZNhStokFlxoTIpHPji/view?usp=sharing',
		learning: {
			en: [
				'Completed a time-boxed frontend practice programme.',
				'Strengthened responsive layout and component-based implementation.',
				'Practised taking an interface from requirements to a finished result.'
			],
			ru: [
				'Прошёл интенсивную программу практики frontend-разработки.',
				'Закрепил адаптивную вёрстку и компонентный подход.',
				'Практиковал полный цикл от требований до готового интерфейса.'
			]
		}
	},
	{
		title: {
			en: 'Advanced Frontend Intensive',
			ru: 'Front-end для продвинутых'
		},
		provider: 'HTML Lessons / RED Group',
		period: { en: 'November — December 2024', ru: 'Ноябрь — декабрь 2024' },
		certificateUrl:
			'https://drive.google.com/file/d/1h423GyIdFXcA1D3FwIiNEC89YykLbEEj/view?usp=sharing',
		courseUrl: 'https://htmllessons.io/intensives/front-end-dlya-prodvinutyh-new',
		learning: {
			en: [
				'Next.js client and server components, App Router and layouts.',
				'SSR, SSG and ISR, API requests and application state.',
				'Authentication, forms, SEO, loading states and performance.'
			],
			ru: [
				'Клиентские и серверные компоненты Next.js, App Router и layouts.',
				'SSR, SSG и ISR, работа с API и состоянием приложения.',
				'Авторизация, формы, SEO, состояния загрузки и оптимизация.'
			]
		}
	},
	{
		title: {
			en: 'Mastering Next.js 13 with TypeScript',
			ru: 'Mastering Next.js 13 with TypeScript'
		},
		provider: 'Code with Mosh',
		period: { en: 'July 2024', ru: 'Июль 2024' },
		certificateUrl:
			'https://drive.google.com/file/d/1rx1oLPMAB-YQrWyJaDT8hEkFa9JnIp0M/view?usp=sharing',
		courseUrl: 'https://codewithmosh.com/p/mastering-next-js-13-with-typescript',
		learning: {
			en: [
				'App Router, nested routing and navigation with TypeScript.',
				'REST APIs, Prisma database integration and NextAuth.',
				'Performance, SEO, deployment and production troubleshooting.'
			],
			ru: [
				'App Router, вложенные маршруты и навигация с TypeScript.',
				'REST API, интеграция Prisma с базой данных и NextAuth.',
				'Производительность, SEO, деплой и разбор ошибок.'
			]
		}
	},
	{
		title: {
			en: 'JavaScript + React — From Zero to Results',
			ru: 'JavaScript + React — с нуля до результата'
		},
		provider: 'Udemy / Ivan Petrichenko',
		period: { en: 'April — June 2024', ru: 'Апрель — июнь 2024' },
		certificateUrl:
			'https://drive.google.com/file/d/1Z5XdpVVANoQLix572GJAgx9WdmXWob6Z/view?usp=sharing',
		courseUrl: 'https://www.udemy.com/course/javascript_full/',
		learning: {
			en: [
				'JavaScript fundamentals, DOM events, asynchronous code and Fetch API.',
				'React components, state, forms and Redux fundamentals.',
				'Git and GitHub, npm, Webpack and project-based development.'
			],
			ru: [
				'Основы JavaScript, DOM-события, асинхронный код и Fetch API.',
				'React-компоненты, состояние, формы и основы Redux.',
				'Git и GitHub, npm, Webpack и разработка учебных проектов.'
			]
		}
	}
]

export const CONTENT = {
	en: {
		langName: 'English',
		nav: {
			work: 'Work',
			about: 'About',
			experience: 'Experience',
			learning: 'Learning',
			reviews: 'Reviews',
			contact: 'Contact'
		},
		headerCta: 'Write on Telegram',
		hero: {
			title: 'I build clean,\nreliable interfaces.',
			lead: 'Mikhail Mazurkevich, frontend developer. I turn designs and ideas into fast, responsive web products with React and Next.js.',
			workCta: 'View projects',
			contactCta: 'Write on Telegram'
		},
		work: {
			index: '04 / Selected work',
			title: 'Three projects.\nThree different challenges.',
			intro:
				'A compact selection focused on product structure, responsive UI and careful frontend execution.',
			open: 'Open project',
			source: 'View source'
		},
		about: {
			index: '01 / About',
			title: 'I make websites\nclear and easy to use.',
			paragraphs: [
				'I am a frontend developer who likes turning clear designs and rough ideas into reliable interfaces. I care about hierarchy, responsive behaviour and the small details that make a product feel complete.',
				'I work with React and Next.js, connect APIs, build forms and product states, and keep the code understandable for the next person who opens it.'
			],
			stackTitle: 'Core stack',
			stack: [
				'React / Next.js',
				'TypeScript / JavaScript',
				'Tailwind / Sass',
				'Forms / State / API'
			],
			cv: 'Open CV',
			linkedin: 'Open LinkedIn'
		},
		experience: {
			index: '02 / Experience',
			title: 'Work experience.',
			intro: 'Commercial projects, teamwork and frontend practice in production-like environments.',
			totalLabel: 'Total commercial experience',
			totalNote: 'Calculated from the timeline below'
		},
		learning: {
			index: '03 / Learning',
			title: 'Education and\ncertificates.',
			intro: 'Structured learning supported by practical projects and continued independent study.',
			currentLabel: 'Current education',
			certificateLabel: 'Certificate',
			courseLabel: 'Course details'
		},
		reviews: {
			index: '05 / Client feedback',
			title: 'Client feedback.',
			badge: 'Kwork reviews',
			caption: 'Feedback from completed freelance projects',
			previous: 'Previous review',
			next: 'Next review'
		},
		contact: {
			index: '06 / Contact',
			title: 'Have a project in mind?',
			text: 'Send a short message with your goal, timeline and any reference you already have.',
			emailLabel: 'Write an email',
			backToTop: 'Back to top',
			copyright: 'Frontend developer / Mikhail Mazurkevich'
		}
	},
	ru: {
		langName: 'Русский',
		nav: {
			work: 'Проекты',
			about: 'Обо мне',
			experience: 'Опыт',
			learning: 'Обучение',
			reviews: 'Отзывы',
			contact: 'Контакты'
		},
		headerCta: 'Написать в Telegram',
		hero: {
			title: 'Создаю чистые\nи надёжные интерфейсы.',
			lead: 'Михаил Мазуркевич, frontend-разработчик. Превращаю дизайн и идеи в быстрые адаптивные веб-продукты на React и Next.js.',
			workCta: 'Смотреть проекты',
			contactCta: 'Написать в Telegram'
		},
		work: {
			index: '04 / Избранные проекты',
			title: 'Три проекта.\nТри разные задачи.',
			intro:
				'Короткая подборка о структуре продукта, адаптивном UI и аккуратной frontend-реализации.',
			open: 'Открыть проект',
			source: 'Смотреть код'
		},
		about: {
			index: '01 / Обо мне',
			title: 'Делаю сайты\nпонятными и удобными.',
			paragraphs: [
				'Я frontend-разработчик. Превращаю готовый дизайн или сырую идею в надёжный интерфейс. Слежу за иерархией, адаптивом и деталями, благодаря которым продукт ощущается завершённым.',
				'Работаю с React и Next.js, подключаю API, собираю формы и состояния продукта, поддерживаю понятную структуру кода.'
			],
			stackTitle: 'Основной стек',
			stack: [
				'React / Next.js',
				'TypeScript / JavaScript',
				'Tailwind / Sass',
				'Формы / State / API'
			],
			cv: 'Открыть CV',
			linkedin: 'Открыть LinkedIn'
		},
		experience: {
			index: '02 / Опыт работы',
			title: 'Опыт работы.',
			intro: 'Коммерческие задачи, командная работа и практика современной frontend-разработки.',
			totalLabel: 'Общий коммерческий опыт',
			totalNote: 'Рассчитано по периодам ниже'
		},
		learning: {
			index: '03 / Обучение',
			title: 'Обучение и\nсертификаты.',
			intro: 'Системное обучение, закреплённое практическими проектами и самостоятельной работой.',
			currentLabel: 'Текущее образование',
			certificateLabel: 'Смотреть сертификат',
			courseLabel: 'Программа курса'
		},
		reviews: {
			index: '05 / Отзывы клиентов',
			title: 'Отзывы клиентов.',
			badge: 'Отзывы на Kwork',
			caption: 'Отзывы о завершённых фриланс-проектах',
			previous: 'Предыдущий отзыв',
			next: 'Следующий отзыв'
		},
		contact: {
			index: '06 / Контакты',
			title: 'Есть проект или идея?',
			text: 'Напишите цель, примерные сроки и пришлите референс, если он уже есть.',
			emailLabel: 'Написать на email',
			backToTop: 'Наверх',
			copyright: 'Frontend-разработчик / Михаил Мазуркевич'
		}
	}
} as const

export function getReviewText(review: Review, locale: Locale) {
	return locale === 'en' ? review.translation : review.original
}
