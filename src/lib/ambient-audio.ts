import { NOTE_EVENT, type NoteDetail, type RippleDetail, audioBus } from './audio-bus'

// Generative ambient soundtrack built entirely with the Web Audio API — no audio files.
// Slow, warm pad chords drift under occasional soft bell "sparkles", and every ripple in
// the dot field plays a pentatonic chime panned to where it happened.

const CHORDS = [
	[50, 57, 62, 66, 69, 76], // Dmaj9
	[47, 54, 59, 62, 66, 73], // Bm9
	[43, 50, 55, 59, 62, 69], // Gmaj7
	[45, 52, 57, 61, 64, 71] // A6/9
]
// D major pentatonic across two octaves for chimes and sparkles.
const SCALE = [74, 76, 78, 81, 83, 86, 88, 90, 93, 95]
const CHORD_SECONDS = 9

const midiToHz = (note: number) => 440 * 2 ** ((note - 69) / 12)

export class AmbientAudio {
	private context: AudioContext
	private master: GainNode
	private padBus: GainNode
	private chimeBus: GainNode
	private chordIndex = 0
	private chordTimer = 0
	private sparkleTimer = 0
	private running = false
	private volume = 0.7
	private analyser: AnalyserNode
	private spectrum: Uint8Array<ArrayBuffer>
	private meterFrame = 0

	constructor() {
		this.context = new AudioContext()
		const ctx = this.context

		this.master = ctx.createGain()
		this.master.gain.value = 0

		// A gentle limiter keeps stacked chimes from ever getting harsh.
		const limiter = ctx.createDynamicsCompressor()
		limiter.threshold.value = -14
		limiter.ratio.value = 6
		this.master.connect(limiter).connect(ctx.destination)

		// The analyser feeds the shared audio bus that makes the dots move to the music.
		this.analyser = ctx.createAnalyser()
		this.analyser.fftSize = 256
		this.analyser.smoothingTimeConstant = 0.85
		this.spectrum = new Uint8Array(this.analyser.frequencyBinCount)
		limiter.connect(this.analyser)

		const reverb = ctx.createConvolver()
		reverb.buffer = this.impulse(5)
		const wet = ctx.createGain()
		wet.gain.value = 0.55
		reverb.connect(wet).connect(this.master)

		// Pads go through a slowly breathing low-pass filter.
		const warmth = ctx.createBiquadFilter()
		warmth.type = 'lowpass'
		warmth.frequency.value = 900
		warmth.Q.value = 0.4
		const lfo = ctx.createOscillator()
		const lfoDepth = ctx.createGain()
		lfo.frequency.value = 0.05
		lfoDepth.gain.value = 450
		lfo.connect(lfoDepth).connect(warmth.frequency)
		lfo.start()

		this.padBus = ctx.createGain()
		this.padBus.gain.value = 0.22
		this.padBus.connect(warmth)
		warmth.connect(this.master)
		warmth.connect(reverb)

		this.chimeBus = ctx.createGain()
		this.chimeBus.gain.value = 0.18
		this.chimeBus.connect(this.master)
		this.chimeBus.connect(reverb)
	}

	get isRunning() {
		return this.running
	}

	async start() {
		if (this.running) return
		this.running = true
		await this.context.resume()
		const now = this.context.currentTime
		this.master.gain.cancelScheduledValues(now)
		this.master.gain.setValueAtTime(this.master.gain.value, now)
		this.master.gain.linearRampToValueAtTime(this.gainFor(this.volume), now + 2.5)
		this.meter()

		this.playChord()
		this.chordTimer = window.setInterval(() => this.playChord(), CHORD_SECONDS * 1000)
		this.scheduleSparkle()
	}

	stop() {
		if (!this.running) return
		this.running = false
		window.clearInterval(this.chordTimer)
		window.clearTimeout(this.sparkleTimer)
		cancelAnimationFrame(this.meterFrame)
		audioBus.level = 0
		audioBus.bass = 0
		const now = this.context.currentTime
		this.master.gain.cancelScheduledValues(now)
		this.master.gain.setValueAtTime(this.master.gain.value, now)
		this.master.gain.linearRampToValueAtTime(0, now + 1.2)
		window.setTimeout(() => {
			if (!this.running) void this.context.suspend()
		}, 1400)
	}

	get currentVolume() {
		return this.volume
	}

	/** Volume 0..1, mapped to a perceptual curve and glided to avoid clicks. */
	setVolume(value: number) {
		this.volume = Math.max(0, Math.min(1, value))
		if (!this.running) return
		const now = this.context.currentTime
		this.master.gain.cancelScheduledValues(now)
		this.master.gain.setTargetAtTime(this.gainFor(this.volume), now, 0.08)
	}

	private gainFor(volume: number) {
		return 1.1 * volume ** 2
	}

	private meter() {
		this.analyser.getByteFrequencyData(this.spectrum)
		let low = 0
		let all = 0
		for (let i = 0; i < this.spectrum.length; i += 1) {
			all += this.spectrum[i]
			if (i < 6) low += this.spectrum[i]
		}
		const level = Math.min(1, (all / this.spectrum.length / 255) * 3)
		const bass = Math.min(1, (low / 6 / 255) * 1.4)
		audioBus.level += (level - audioBus.level) * 0.15
		audioBus.bass += (bass - audioBus.bass) * 0.1
		if (this.running) this.meterFrame = requestAnimationFrame(() => this.meter())
	}

	private emitNote(detail: NoteDetail) {
		window.dispatchEvent(new CustomEvent(NOTE_EVENT, { detail }))
	}

	// A ripple at (x, y) in 0..1 field coordinates: left-right picks pitch and pan.
	chime({ x, y }: RippleDetail) {
		if (!this.running) return
		const index = Math.min(SCALE.length - 1, Math.max(0, Math.round(x * (SCALE.length - 1))))
		const pan = Math.max(-0.8, Math.min(0.8, x * 2 - 1))
		this.bell(midiToHz(SCALE[index]), 0.32 + (1 - y) * 0.12, pan, 3.2)
	}

	dispose() {
		this.stop()
		window.setTimeout(() => void this.context.close(), 1500)
	}

	private playChord() {
		const ctx = this.context
		const start = ctx.currentTime + 0.05
		const duration = CHORD_SECONDS + 4
		const chord = CHORDS[this.chordIndex % CHORDS.length]
		this.chordIndex += 1
		this.emitNote({ x: 0.5, y: 0.55, strength: 0.45 })

		chord.forEach((note, voice) => {
			const frequency = midiToHz(note)
			const envelope = ctx.createGain()
			const peak = voice === 0 ? 0.5 : 0.28
			envelope.gain.setValueAtTime(0, start)
			envelope.gain.linearRampToValueAtTime(peak, start + 3.5)
			envelope.gain.setValueAtTime(peak, start + duration - 4.5)
			envelope.gain.linearRampToValueAtTime(0, start + duration)
			envelope.connect(this.padBus)

			// Two slightly detuned oscillators per voice give a soft chorus shimmer.
			for (const detune of [-7, 7]) {
				const oscillator = ctx.createOscillator()
				oscillator.type = voice === 0 ? 'sine' : 'triangle'
				oscillator.frequency.value = frequency
				oscillator.detune.value = detune
				oscillator.connect(envelope)
				oscillator.start(start)
				oscillator.stop(start + duration + 0.1)
			}
		})
	}

	private scheduleSparkle() {
		const wait = 2600 + Math.random() * 4200
		this.sparkleTimer = window.setTimeout(() => {
			if (!this.running) return
			const note = SCALE[Math.floor(Math.random() * SCALE.length)] + (Math.random() < 0.3 ? 12 : 0)
			const pan = Math.random() * 1.2 - 0.6
			this.bell(midiToHz(note), 0.1 + Math.random() * 0.08, pan, 4)
			this.emitNote({ x: (pan + 1) / 2, y: 0.15 + Math.random() * 0.7, strength: 0.6 })
			this.scheduleSparkle()
		}, wait)
	}

	// Soft glassy bell: a sine plus a quiet inharmonic partial with a long decay.
	private bell(frequency: number, level: number, pan: number, decay: number) {
		const ctx = this.context
		const now = ctx.currentTime
		const panner = ctx.createStereoPanner()
		panner.pan.value = pan
		panner.connect(this.chimeBus)

		const partials: [number, number][] = [
			[1, 1],
			[2.76, 0.18],
			[5.4, 0.05]
		]
		for (const [ratio, gain] of partials) {
			const oscillator = ctx.createOscillator()
			oscillator.type = 'sine'
			oscillator.frequency.value = frequency * ratio
			const envelope = ctx.createGain()
			envelope.gain.setValueAtTime(0, now)
			envelope.gain.linearRampToValueAtTime(level * gain, now + 0.012)
			envelope.gain.exponentialRampToValueAtTime(0.0001, now + decay / ratio ** 0.4)
			oscillator.connect(envelope).connect(panner)
			oscillator.start(now)
			oscillator.stop(now + decay + 0.1)
		}
	}

	private impulse(seconds: number) {
		const ctx = this.context
		const length = Math.floor(ctx.sampleRate * seconds)
		const buffer = ctx.createBuffer(2, length, ctx.sampleRate)
		for (let channel = 0; channel < 2; channel += 1) {
			const data = buffer.getChannelData(channel)
			for (let i = 0; i < length; i += 1) {
				data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3
			}
		}
		return buffer
	}
}
