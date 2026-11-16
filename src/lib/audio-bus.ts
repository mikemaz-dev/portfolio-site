// Tiny shared channel between the (lazily loaded) audio engine and the visuals.
// The engine writes smoothed levels every frame; the dot field reads them, so the
// visuals never need to import the audio code.

export const audioBus = {
	/** Overall loudness, 0..1, smoothed. */
	level: 0,
	/** Low-frequency energy, 0..1, smoothed — the "breath" of the pads. */
	bass: 0
}

/** A note was played: { x, y } in 0..1 field coordinates, strength 0..1. */
export const NOTE_EVENT = 'ambient:note'
export type NoteDetail = { x: number; y: number; strength: number }

/** A user ripple in the field (used to trigger chimes). */
export const RIPPLE_EVENT = 'dotfield:ripple'
export type RippleDetail = { x: number; y: number }
