import type { ProjectCase, ServiceItem, Testimonial } from './site.data'

export type Language = 'en' | 'ru'

type NavItem = {
	name: string
	href: string
}

type SiteCopy = {
	nav: NavItem[]
	cta: string
	hero: {
		badge: string
		title: string
		text: string
		viewWork: string
		cardLabel: string
		cardTitle: string
		badges: string[]
		floating: string[]
	}
	stats: Array<{ value: string; label: string }>
	about: {
		eyebrow: string
		title: string
		text: string
		facts: Array<{ value: string; label: string }>
	}
	services: {
		eyebrow: string
		title: string
		link: string
		items: ServiceItem[]
	}
	projects: {
		eyebrow: string
		title: string
		privateLabel: string
		privateDetailLabel: string
		items: ProjectCase[]
	}
	tech: {
		eyebrow: string
		title: string
		text: string
	}
	process: {
		eyebrow: string
		title: string
		steps: Array<{ title: string; text: string }>
	}
	testimonial: {
		eyebrow: string
		item: Testimonial
	}
	faq: {
		eyebrow: string
		title: string
		items: Array<{ question: string; answer: string }>
	}
	contact: {
		eyebrow: string
		title: string
		text: string
		email: string
		kwork: string
		cards: {
			telegram: string
			telegramText: string
			kwork: string
			kworkText: string
			email: string
			emailText: string
			github: string
			githubText: string
		}
	}
	projectPage: {
		back: string
		live: string
		github: string
		problem: string
		solution: string
		result: string
		nextEyebrow: string
		nextTitle: string
		nextText: string
	}
	footer: {
		text: string
		built: string
	}
}

const projectImages = {
	taskhub: '/wip_screen/taskhub.png',
	nextPizza: '/wip_screen/next-pizza.png',
	justbank: '/wip_screen/justbank.png',
	embrace: '/wip_screen/embrace.png'
}

export const SITE_COPY: Record<Language, SiteCopy> = {
	en: {
		nav: [
			{ name: 'Home', href: '/#home' },
			{ name: 'Services', href: '/#services' },
			{ name: 'Projects', href: '/#projects' },
			{ name: 'About', href: '/#about' },
			{ name: 'FAQ', href: '/#faq' },
			{ name: 'Contact', href: '/#contact' }
		],
		cta: "Let's talk",
		hero: {
			badge: 'Mike Mazur, Frontend Developer',
			title: 'Helping brands turn ideas into polished web products.',
			text: 'I build fast, responsive websites, landing pages, WordPress websites, and product frontends that help businesses look clearer, sharper, and more trustworthy online.',
			viewWork: 'View work',
			cardLabel: 'Commercial frontend',
			cardTitle: 'Fast pages. Clean UI. Clear business flow.',
			badges: ['2+ years', '20+ projects', 'WordPress', 'SEO-ready'],
			floating: ['React', 'Next.js', 'Landing', 'WordPress']
		},
		stats: [
			{ value: '2+', label: 'Years of frontend practice' },
			{ value: '20+', label: 'Projects built and refined' },
			{ value: '1', label: 'Long-term client collaboration' }
		],
		about: {
			eyebrow: 'About',
			title: 'Frontend that makes business look sharper.',
			text: 'I am Mike Mazur, a Frontend Developer focused on clean, responsive, and reliable web interfaces. I help businesses, founders, and teams turn ideas into fast websites and polished web products.',
			facts: [
				{ value: '2+', label: 'Years of practice' },
				{ value: '20+', label: 'Projects shipped' },
				{ value: 'WordPress', label: 'Business websites' }
			]
		},
		services: {
			eyebrow: 'Services',
			title: 'Design-aware frontend services.',
			link: 'Discuss a project',
			items: [
				{
					title: 'Website development',
					description: 'Clean, responsive websites from design or rough idea to a polished launch.',
					deliverables: ['Responsive layout', 'Fast loading pages', 'SEO-ready structure'],
					ctaLabel: "Let's talk"
				},
				{
					title: 'Landing pages',
					description: 'Focused pages for products, services, launches, and lead generation.',
					deliverables: ['Conversion-focused sections', 'Clear CTA flow', 'Mobile-first UI'],
					ctaLabel: "Let's talk"
				},
				{
					title: 'WordPress websites',
					description:
						'WordPress pages and business websites for clients who need an easy content workflow.',
					deliverables: ['WordPress setup', 'Theme customization', 'Content-friendly pages'],
					ctaLabel: "Let's talk"
				},
				{
					title: 'Web products frontend',
					description:
						'Frontend for dashboards, SaaS tools, personal products, and client portals.',
					deliverables: ['React / Next.js UI', 'Forms and state', 'API integration'],
					ctaLabel: "Let's talk"
				}
			]
		},
		projects: {
			eyebrow: 'Selected work',
			title: 'Projects that show product thinking, layout skill, and execution.',
			privateLabel: 'Private client work',
			privateDetailLabel: 'Confidential commercial case',
			items: [
				{
					slug: 'taskhub',
					title: 'TaskHub',
					kind: 'Productivity web app',
					summary: 'A modern task management platform with a polished dashboard experience.',
					problem:
						'The product needed a clear interface for organizing work without making the flow feel heavy.',
					solution:
						'Built a responsive Next.js interface with structured screens, reusable UI patterns, and smooth product interactions.',
					result:
						'A portfolio-ready SaaS-style product that demonstrates dashboard thinking, application structure, and frontend polish.',
					techs: ['Next.js', 'TypeScript', 'Tailwind', 'React Hook Form', 'Zod', 'Zustand'],
					preview: projectImages.taskhub,
					liveUrl: 'https://taskhub-green.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/taskhub'
				},
				{
					slug: 'next-pizza',
					title: 'NextPizza',
					kind: 'Full-stack commerce app',
					summary: 'A pizza delivery app with product browsing, ordering flow, and account logic.',
					problem:
						'The interface had to make a multi-step ordering experience feel simple on desktop and mobile.',
					solution:
						'Created product pages, cart flow, authentication-aware UI, and a clean commerce layout with Next.js.',
					result:
						'A complete commerce-style project showing full product flow, frontend architecture, and user journey thinking.',
					techs: ['Next.js', 'TypeScript', 'Tailwind', 'NextAuth.js', 'Prisma', 'React Hook Form'],
					preview: projectImages.nextPizza,
					liveUrl: 'https://next-pizza-7zt4-nine.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/next-pizza'
				},
				{
					slug: 'justbank',
					title: 'JustBank',
					kind: 'Finance interface',
					summary: 'A banking interface with transactions, statistics, and account operations.',
					problem: 'Financial screens need to stay readable, trustworthy, and easy to scan.',
					solution:
						'Designed a restrained interface with clear data blocks, account actions, and responsive transaction views.',
					result:
						'A polished UI case that shows attention to complex layouts, information hierarchy, and product clarity.',
					techs: ['React.js', 'JavaScript', 'CSS', 'API integration'],
					preview: projectImages.justbank,
					liveUrl: 'https://justbank.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/justbank'
				},
				{
					slug: 'embrace-agency',
					title: 'Embrace Agency',
					kind: 'Landing page',
					summary:
						'A stylish one-page agency website focused on presentation and responsive layout.',
					problem:
						'The page needed to communicate an agency offer quickly and look credible across screen sizes.',
					solution:
						'Built a crisp landing page with structured content sections, strong spacing, and mobile-first layout.',
					result:
						'A lightweight marketing site case that fits landing-page and small business client requests.',
					techs: ['HTML', 'CSS', 'JavaScript', 'Responsive layout'],
					preview: projectImages.embrace,
					liveUrl: 'https://mikemaz-dev.github.io/Embrace-Agency/',
					githubUrl: 'https://github.com/mikemaz-dev/Embrace-Agency'
				},
				{
					slug: 'private-client-platform',
					title: 'Private Client Platform',
					kind: 'Confidential commercial work',
					summary:
						'Frontend work for a long-term client project, presented without sensitive details.',
					problem:
						'The client needed reliable frontend support while keeping the product, brand, and internal data private.',
					solution:
						'Delivered interface updates, layout improvements, bug fixes, and feature support within an existing product workflow.',
					result:
						'Ongoing collaboration with a repeat client, focused on stable delivery, quick communication, and business-oriented execution.',
					techs: ['React.js', 'TypeScript', 'Frontend architecture', 'UI maintenance'],
					preview: '',
					isPrivate: true
				}
			]
		},
		tech: {
			eyebrow: 'Tech stack',
			title: 'Modern tools, practical choices.',
			text: 'I keep the stack focused on reliable frontend delivery, WordPress tasks, and fast iteration.'
		},
		process: {
			eyebrow: 'Process',
			title: 'Fast delivery without chaotic decisions.',
			steps: [
				{
					title: 'Understand the business goal',
					text: 'I clarify what the page or product must achieve before touching the interface.'
				},
				{
					title: 'Build the useful version first',
					text: 'I focus on clean structure, responsive behavior, and a flow that users can understand.'
				},
				{
					title: 'Polish what affects trust',
					text: 'Spacing, states, performance, and small interactions are refined after the core is stable.'
				}
			]
		},
		testimonial: {
			eyebrow: 'Client feedback',
			item: {
				quote:
					'Mike is attentive, reliable, and fast in communication. He helped us improve frontend tasks with care and consistency.',
				authorName: 'Long-term client',
				authorRole: 'Product owner',
				companyLabel: 'Private project',
				isAnonymized: true
			}
		},
		faq: {
			eyebrow: 'FAQ',
			title: 'A few answers before we talk.',
			items: [
				{
					question: 'What kind of projects do you take?',
					answer:
						'Landing pages, business websites, WordPress pages, frontend for web products, and UI improvements for existing projects.'
				},
				{
					question: 'Can you work from a Figma design?',
					answer:
						'Yes. I can build from a prepared design or help structure the page if you only have a rough idea.'
				},
				{
					question: 'Do you show private client work?',
					answer:
						'Only in an anonymized way. I do not publish client names, screenshots, domains, or sensitive metrics without permission.'
				},
				{
					question: 'How do we start?',
					answer:
						'Send me a short message in Telegram, Kwork, or by email with your goal, timeline, and any links or design files you already have.'
				}
			]
		},
		contact: {
			eyebrow: 'Contact',
			title: 'Ready to turn your idea into a polished web product?',
			text: 'Send me your goal, timeline, and any design or references you already have. I will reply with the next practical step.',
			email: 'Email me',
			kwork: 'Kwork profile',
			cards: {
				telegram: 'Telegram',
				telegramText: 'Fastest reply for project questions and quick estimates.',
				kwork: 'Kwork',
				kworkText: 'Freelance profile for service orders and safe deals.',
				email: 'Email',
				emailText: 'Best place for briefs, files, and project details.',
				github: 'GitHub',
				githubText: 'Code, experiments, and frontend project history.'
			}
		},
		projectPage: {
			back: 'Back to projects',
			live: 'Live project',
			github: 'GitHub',
			problem: 'Problem',
			solution: 'Solution',
			result: 'Result',
			nextEyebrow: 'Next project',
			nextTitle: 'Want a similar level of polish for your website?',
			nextText: 'Tell me what you are building and I will help shape the first practical version.'
		},
		footer: {
			text: 'Frontend Developer helping brands turn ideas into polished web products.',
			built: 'Built with Next.js.'
		}
	},
	ru: {
		nav: [
			{ name: 'Главная', href: '/#home' },
			{ name: 'Услуги', href: '/#services' },
			{ name: 'Проекты', href: '/#projects' },
			{ name: 'Обо мне', href: '/#about' },
			{ name: 'FAQ', href: '/#faq' },
			{ name: 'Контакты', href: '/#contact' }
		],
		cta: 'Обсудить проект',
		hero: {
			badge: 'Mike Mazur, Frontend Developer',
			title: 'Создаю сайты для бизнеса',
			text: 'Создаю быстрые адаптивные сайты, лендинги, WordPress-сайты и frontend для продуктов, чтобы бизнес выглядел понятнее, сильнее и дороже.',
			viewWork: 'Смотреть работы',
			cardLabel: 'Коммерческий frontend',
			cardTitle: 'Быстрый сайт. Чистый UI. Понятный путь клиента.',
			badges: ['2+ года', '20+ проектов', 'WordPress', 'SEO-ready'],
			floating: ['React', 'Next.js', 'Лендинг', 'WordPress']
		},
		stats: [
			{ value: '2+', label: 'Года frontend-практики' },
			{ value: '20+', label: 'Проектов собрано и улучшено' },
			{ value: '1', label: 'Долгосрочный клиент' }
		],
		about: {
			eyebrow: 'Обо мне',
			title: 'Frontend, который делает бизнес визуально сильнее.',
			text: 'Я Mike Mazur, Frontend Developer. Делаю чистые, адаптивные и надежные интерфейсы для бизнесов, фаундеров и команд.',
			facts: [
				{ value: '2+', label: 'Года практики' },
				{ value: '20+', label: 'Собранных проектов' },
				{ value: 'WordPress', label: 'Сайты для бизнеса' }
			]
		},
		services: {
			eyebrow: 'Услуги',
			title: 'Frontend-услуги с вниманием к дизайну.',
			link: 'Обсудить проект',
			items: [
				{
					title: 'Разработка сайтов',
					description:
						'Чистые адаптивные сайты по дизайну или идее, доведенные до аккуратного запуска.',
					deliverables: ['Адаптивная верстка', 'Быстрая загрузка', 'SEO-ready структура'],
					ctaLabel: 'Обсудить проект'
				},
				{
					title: 'Лендинги',
					description: 'Страницы для услуг, продуктов, запусков и заявок с понятной структурой.',
					deliverables: ['Конверсионные блоки', 'Понятные CTA', 'Mobile-first UI'],
					ctaLabel: 'Обсудить проект'
				},
				{
					title: 'WordPress-сайты',
					description: 'WordPress-страницы и бизнес-сайты, где клиенту удобно обновлять контент.',
					deliverables: ['Настройка WordPress', 'Кастомизация темы', 'Удобная структура контента'],
					ctaLabel: 'Обсудить проект'
				},
				{
					title: 'Frontend веб-продуктов',
					description: 'Frontend для dashboard, SaaS, личных продуктов и клиентских кабинетов.',
					deliverables: ['React / Next.js UI', 'Формы и состояние', 'Интеграция API'],
					ctaLabel: 'Обсудить проект'
				}
			]
		},
		projects: {
			eyebrow: 'Избранные работы',
			title: 'Проекты, которые показывают продуктовый подход, верстку и исполнение.',
			privateLabel: 'Приватная клиентская работа',
			privateDetailLabel: 'Конфиденциальный коммерческий кейс',
			items: [
				{
					slug: 'taskhub',
					title: 'TaskHub',
					kind: 'Productivity web app',
					summary: 'Современная платформа управления задачами с аккуратным dashboard-интерфейсом.',
					problem: 'Нужно было сделать понятный интерфейс для организации работы без перегруза.',
					solution:
						'Собрал адаптивный Next.js-интерфейс со структурными экранами, переиспользуемыми UI-паттернами и плавными взаимодействиями.',
					result:
						'SaaS-style проект, который показывает работу с dashboard, архитектурой интерфейса и frontend-polish.',
					techs: ['Next.js', 'TypeScript', 'Tailwind', 'React Hook Form', 'Zod', 'Zustand'],
					preview: projectImages.taskhub,
					liveUrl: 'https://taskhub-green.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/taskhub'
				},
				{
					slug: 'next-pizza',
					title: 'NextPizza',
					kind: 'Full-stack commerce app',
					summary: 'Приложение доставки пиццы с каталогом, заказом и логикой аккаунта.',
					problem: 'Многошаговый заказ должен был оставаться простым на desktop и mobile.',
					solution:
						'Собрал продуктовые страницы, корзину, auth-aware UI и чистую ecommerce-структуру на Next.js.',
					result:
						'Полный commerce-style проект с понятным пользовательским флоу и frontend-архитектурой.',
					techs: ['Next.js', 'TypeScript', 'Tailwind', 'NextAuth.js', 'Prisma', 'React Hook Form'],
					preview: projectImages.nextPizza,
					liveUrl: 'https://next-pizza-7zt4-nine.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/next-pizza'
				},
				{
					slug: 'justbank',
					title: 'JustBank',
					kind: 'Finance interface',
					summary: 'Банковский интерфейс с транзакциями, статистикой и действиями по аккаунту.',
					problem: 'Финансовые экраны должны быть читаемыми, надежными и легко сканироваться.',
					solution:
						'Сделал сдержанный интерфейс с понятными data-блоками, действиями и адаптивными транзакциями.',
					result:
						'UI-кейс, который показывает работу со сложной структурой и визуальной иерархией.',
					techs: ['React.js', 'JavaScript', 'CSS', 'API integration'],
					preview: projectImages.justbank,
					liveUrl: 'https://justbank.vercel.app/',
					githubUrl: 'https://github.com/mikemaz-dev/justbank'
				},
				{
					slug: 'embrace-agency',
					title: 'Embrace Agency',
					kind: 'Landing page',
					summary: 'Стильный one-page сайт агентства с фокусом на презентацию и адаптив.',
					problem:
						'Страница должна была быстро объяснять оффер агентства и выглядеть убедительно на разных экранах.',
					solution:
						'Собрал легкий лендинг с четкими секциями, хорошими отступами и mobile-first версткой.',
					result:
						'Маркетинговый сайт, который хорошо подходит под запросы малого бизнеса и лендингов.',
					techs: ['HTML', 'CSS', 'JavaScript', 'Responsive layout'],
					preview: projectImages.embrace,
					liveUrl: 'https://mikemaz-dev.github.io/Embrace-Agency/',
					githubUrl: 'https://github.com/mikemaz-dev/Embrace-Agency'
				},
				{
					slug: 'private-client-platform',
					title: 'Private Client Platform',
					kind: 'Конфиденциальная коммерческая работа',
					summary:
						'Frontend-работа для долгосрочного клиента без раскрытия чувствительных деталей.',
					problem:
						'Клиенту была нужна надежная frontend-поддержка с сохранением приватности продукта, бренда и внутренних данных.',
					solution:
						'Выполнял обновления интерфейса, улучшения верстки, исправления и поддержку фич в существующем продукте.',
					result:
						'Долгосрочная работа с повторным клиентом, где важны стабильная доставка, быстрая коммуникация и бизнес-ориентированность.',
					techs: ['React.js', 'TypeScript', 'Frontend architecture', 'UI maintenance'],
					preview: '',
					isPrivate: true
				}
			]
		},
		tech: {
			eyebrow: 'Tech stack',
			title: 'Современные инструменты, практичный выбор.',
			text: 'Держу стек сфокусированным на надежной frontend-разработке, WordPress-задачах и быстрой итерации.'
		},
		process: {
			eyebrow: 'Процесс',
			title: 'Быстрая работа без хаотичных решений.',
			steps: [
				{
					title: 'Понимаю бизнес-цель',
					text: 'Сначала уточняю, что страница или продукт должны решить для клиента.'
				},
				{
					title: 'Собираю полезную версию',
					text: 'Фокусируюсь на структуре, адаптиве и понятном пользовательском флоу.'
				},
				{
					title: 'Довожу детали, влияющие на доверие',
					text: 'Отступы, состояния, скорость и маленькие взаимодействия полируются после стабильной базы.'
				}
			]
		},
		testimonial: {
			eyebrow: 'Отзыв клиента',
			item: {
				quote:
					'Mike внимательный, надежный и быстро выходит на связь. Он помогал улучшать frontend-задачи аккуратно и стабильно.',
				authorName: 'Долгосрочный клиент',
				authorRole: 'Product owner',
				companyLabel: 'Private project',
				isAnonymized: true
			}
		},
		faq: {
			eyebrow: 'FAQ',
			title: 'Пара ответов перед разговором.',
			items: [
				{
					question: 'Какие проекты ты берешь?',
					answer:
						'Лендинги, бизнес-сайты, WordPress-страницы, frontend для веб-продуктов и улучшение существующих интерфейсов.'
				},
				{
					question: 'Можешь работать по Figma?',
					answer:
						'Да. Могу сверстать по готовому дизайну или помочь структурировать страницу, если есть только идея.'
				},
				{
					question: 'Показываешь ли приватные клиентские проекты?',
					answer:
						'Только обезличенно. Не публикую названия, скриншоты, домены и чувствительные метрики без разрешения.'
				},
				{
					question: 'Как начать?',
					answer:
						'Напиши в Telegram, Kwork или на email: цель проекта, сроки и ссылки/дизайн, если они уже есть.'
				}
			]
		},
		contact: {
			eyebrow: 'Контакты',
			title: 'Готов превратить идею в аккуратный веб-продукт?',
			text: 'Напиши цель, сроки и любые референсы или дизайн. Я отвечу и предложу следующий практичный шаг.',
			email: 'Написать на email',
			kwork: 'Профиль на Kwork',
			cards: {
				telegram: 'Telegram',
				telegramText: 'Самый быстрый способ обсудить задачу и получить примерную оценку.',
				kwork: 'Kwork',
				kworkText: 'Фриланс-профиль для заказов, услуг и безопасной сделки.',
				email: 'Email',
				emailText: 'Удобно для брифа, файлов, ссылок и подробностей проекта.',
				github: 'GitHub',
				githubText: 'Код, эксперименты и история frontend-проектов.'
			}
		},
		projectPage: {
			back: 'Назад к проектам',
			live: 'Открыть проект',
			github: 'GitHub',
			problem: 'Задача',
			solution: 'Решение',
			result: 'Результат',
			nextEyebrow: 'Следующий проект',
			nextTitle: 'Нужен похожий уровень аккуратности для сайта?',
			nextText: 'Расскажи, что ты строишь, и я помогу сформировать первую практичную версию.'
		},
		footer: {
			text: 'Frontend Developer, который помогает брендам превращать идеи в аккуратные веб-продукты.',
			built: 'Сделано на Next.js.'
		}
	}
}
