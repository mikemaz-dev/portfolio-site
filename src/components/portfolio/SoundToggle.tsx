'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'
import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from 'react'

import type { AmbientAudio } from '@/lib/ambient-audio'
import { RIPPLE_EVENT, type RippleDetail } from '@/lib/audio-bus'

const VOLUME_KEY = 'mikemaz-volume'
const AUTO_CLOSE_MS = 4000

function readVolume() {
	try {
		const stored = Number(window.localStorage.getItem(VOLUME_KEY))
		return Number.isFinite(stored) && stored > 0 && stored <= 1 ? stored : 0.7
	} catch {
		return 0.7
	}
}

// Opt-in ambient soundtrack with a small volume panel. The audio engine is loaded only
// on the first click, so visitors who never press it download nothing extra.
export function SoundToggle({ locale }: { locale: 'en' | 'ru' }) {
	const ru = locale === 'ru'
	const engine = useRef<AmbientAudio | null>(null)
	const root = useRef<HTMLDivElement>(null)
	const closeTimer = useRef(0)
	const lastAudible = useRef(0.7)
	const [playing, setPlaying] = useState(false)
	const [loading, setLoading] = useState(false)
	const [panelOpen, setPanelOpen] = useState(false)
	const [volume, setVolume] = useState(0.7)

	useEffect(() => {
		const stored = readVolume()
		setVolume(stored)
		lastAudible.current = stored

		const onRipple = (event: Event) => {
			engine.current?.chime((event as CustomEvent<RippleDetail>).detail)
		}
		const onHide = () => {
			if (document.hidden && engine.current?.isRunning) {
				engine.current.stop()
				setPlaying(false)
				setPanelOpen(false)
			}
		}
		window.addEventListener(RIPPLE_EVENT, onRipple)
		document.addEventListener('visibilitychange', onHide)
		return () => {
			window.removeEventListener(RIPPLE_EVENT, onRipple)
			document.removeEventListener('visibilitychange', onHide)
			window.clearTimeout(closeTimer.current)
			engine.current?.dispose()
			engine.current = null
		}
	}, [])

	// Close the panel on an outside press or Escape.
	useEffect(() => {
		if (!panelOpen) return
		const outside = (event: globalThis.PointerEvent) => {
			if (event.target instanceof Node && !root.current?.contains(event.target)) setPanelOpen(false)
		}
		const onEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setPanelOpen(false)
		}
		document.addEventListener('pointerdown', outside)
		document.addEventListener('keydown', onEscape)
		return () => {
			document.removeEventListener('pointerdown', outside)
			document.removeEventListener('keydown', onEscape)
		}
	}, [panelOpen])

	const scheduleClose = (delay = AUTO_CLOSE_MS) => {
		window.clearTimeout(closeTimer.current)
		closeTimer.current = window.setTimeout(() => setPanelOpen(false), delay)
	}
	const keepOpen = () => window.clearTimeout(closeTimer.current)

	const start = async () => {
		setLoading(true)
		try {
			if (!engine.current) {
				const { AmbientAudio } = await import('@/lib/ambient-audio')
				engine.current = new AmbientAudio()
			}
			engine.current.setVolume(volume)
			await engine.current.start()
			setPlaying(true)
			setPanelOpen(true)
			scheduleClose()
		} finally {
			setLoading(false)
		}
	}

	const stop = () => {
		engine.current?.stop()
		setPlaying(false)
		setPanelOpen(false)
	}

	const onButton = () => {
		if (loading) return
		if (!playing) {
			void start()
			return
		}
		setPanelOpen(open => !open)
		keepOpen()
	}

	const changeVolume = (value: number) => {
		setVolume(value)
		if (value > 0) lastAudible.current = value
		engine.current?.setVolume(value)
		try {
			window.localStorage.setItem(VOLUME_KEY, String(value || lastAudible.current))
		} catch {}
	}

	const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
	const buttonLabel = playing
		? ru
			? 'Настройки музыки'
			: 'Music settings'
		: ru
			? 'Включить музыку'
			: 'Turn music on'

	return (
		<div
			ref={root}
			className='relative'
			onPointerEnter={(event: PointerEvent) => event.pointerType === 'mouse' && keepOpen()}
			onPointerLeave={(event: PointerEvent) =>
				event.pointerType === 'mouse' && panelOpen && scheduleClose(1200)
			}
		>
			<button
				type='button'
				onClick={onButton}
				aria-label={buttonLabel}
				aria-expanded={playing ? panelOpen : undefined}
				aria-controls={playing ? 'sound-panel' : undefined}
				title={buttonLabel}
				data-playing={playing}
				className='group/sound inline-flex min-h-11 min-w-11 items-center justify-center gap-2.5 rounded-full bg-chip/95 px-4 text-[13px] tracking-[0.01em] uppercase transition-colors duration-500 hover:bg-ink hover:text-white data-[playing=true]:bg-accent data-[playing=true]:text-white'
			>
				<span className='max-sm:sr-only'>{ru ? 'Звук' : 'Sound'}</span>
				<span
					aria-hidden='true'
					className='flex h-3.5 items-end gap-[2px]'
				>
					{[0, 1, 2, 3].map(bar => (
						<span
							key={bar}
							className='h-full w-[2px] origin-bottom scale-y-[0.3] rounded-full bg-current group-data-[playing=true]/sound:animate-eq'
							style={{
								animationDelay: `${bar * -0.27}s`,
								animationDuration: `${0.9 + bar * 0.17}s`
							}}
						/>
					))}
				</span>
			</button>

			{playing && panelOpen ? (
				<div
					id='sound-panel'
					role='group'
					aria-label={ru ? 'Музыка' : 'Music'}
					className='absolute top-[calc(100%+8px)] right-0 w-[min(280px,calc(100vw-32px))] rounded-[20px] bg-white p-4 text-ink shadow-[0_30px_80px_-30px_rgb(8_8_12/35%)] motion-safe:animate-menu-in max-sm:-right-24'
					onFocus={keepOpen}
					onPointerDown={keepOpen}
				>
					<p className='m-0 text-[13px] uppercase'>{ru ? 'Эмбиент' : 'Ambient'}</p>
					<p className='mt-1 mb-0 text-xs leading-snug text-muted'>
						{ru
							? 'Музыка рождается прямо в браузере. Кликайте по точкам — они звучат.'
							: 'Generated live in your browser. Click the dots — they ring.'}
					</p>

					<div className='mt-4 flex items-center gap-3'>
						<button
							type='button'
							onClick={() => changeVolume(volume === 0 ? lastAudible.current : 0)}
							aria-label={
								volume === 0 ? (ru ? 'Включить звук' : 'Unmute') : ru ? 'Без звука' : 'Mute'
							}
							className='grid size-9 shrink-0 place-items-center rounded-full bg-chip transition-colors duration-300 hover:bg-ink hover:text-white'
						>
							<VolumeIcon
								size={16}
								aria-hidden='true'
							/>
						</button>
						<input
							type='range'
							min={0}
							max={100}
							step={1}
							value={Math.round(volume * 100)}
							onChange={event => changeVolume(event.currentTarget.valueAsNumber / 100)}
							aria-label={ru ? 'Громкость' : 'Volume'}
							aria-valuetext={`${Math.round(volume * 100)}%`}
							style={{ '--fill': `${Math.round(volume * 100)}%` } as CSSProperties}
							className='h-9 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-accent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-chip [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-accent)_var(--fill),var(--color-chip)_var(--fill))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-300 active:[&::-webkit-slider-thumb]:scale-125'
						/>
						<span className='w-9 shrink-0 text-right text-xs text-muted tabular-nums'>
							{Math.round(volume * 100)}
						</span>
					</div>

					<button
						type='button'
						onClick={stop}
						className='mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-ink text-[13px] text-white uppercase transition-colors duration-500 hover:bg-accent'
					>
						{ru ? 'Выключить музыку' : 'Turn music off'}
					</button>
				</div>
			) : null}
		</div>
	)
}
