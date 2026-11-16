// Shared Tailwind recipes for the monochrome studio look.

export const shell = 'mx-auto w-full max-w-[1440px] px-[clamp(16px,3.4vw,48px)]'

export const sectionSpace = 'py-[clamp(72px,10vw,160px)]'

// Small uppercase captions used everywhere as quiet signposts.
export const caption = 'm-0 text-[13px] leading-snug tracking-[0.01em] uppercase'

export const sectionTitle =
	'm-0 text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[0.92] font-normal tracking-[-0.025em] text-balance'

// Pill buttons with a trailing dot, as in a studio UI.
const pill =
	'group/pill inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-5 text-[13px] leading-none tracking-[0.01em] uppercase transition-[background-color,color,transform] duration-500 ease-out-expo active:scale-95'

export const pillDark = `${pill} bg-ink text-white hover:bg-accent`

export const pillLight = `${pill} bg-chip text-ink hover:bg-ink hover:text-white`

export const pillWhite = `${pill} bg-white text-ink hover:bg-accent hover:text-white`

export const pillGhostOnDark = `${pill} bg-white/10 text-white hover:bg-white hover:text-ink`

export const pillDot =
	'size-1.5 rounded-full bg-current transition-transform duration-500 ease-out-expo group-hover/pill:scale-150'

// Underlined inline link.
export const textLink =
	'inline-flex min-h-11 items-center gap-1.5 underline decoration-line decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-current'
