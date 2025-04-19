export const cardAnimation = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.1 },
	whileHover: { scale: 1.02 },
}

export const imageOverlayAnimation = {
	initial: { opacity: 0, y: 10 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.1, delay: 0.1 }
}

export const titleAnimation = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.1, delay: 0.15 }
}

export const descriptionAnimation = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.1, delay: 0.25 }
}
