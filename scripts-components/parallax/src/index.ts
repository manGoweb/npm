import { Component } from '@mangoweb/scripts-base'
import { lightBounds } from 'light-bounds'

const easings = {
	linear: (x: number) => x,
	easeIn: (x: number) => x * x,
	easeOut: (x: number) => x * (2 - x),
	easeInOut: (x: number) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
}

interface ParallaxProps {
	customProperty?: string
	easing?: keyof typeof easings
}

const PARALLAX_REACH = 1 // 100vh

function clamp(min: number, value: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

export class Parallax extends Component<ParallaxProps> {
	public static componentName = 'Parallax'

	init() {
		lightBounds(this.el, this.update)
		this.update()
	}

	update = () => {
		const reachDistance = window.innerHeight * PARALLAX_REACH
		const easing = easings[this.getPropOrElse('easing', 'linear')]
		const offset = easing(
			clamp(-1, (this.getElementYCenter() - (window.scrollY + window.innerHeight / 2)) / reachDistance, 1)
		)

		this.el.style.setProperty(`--${this.getPropOrElse('customProperty', 'parallax')}`, `${offset}`)
	}

	getElementYCenter = () => {
		const rect = lightBounds(this.el)
		return window.scrollY + rect.top + rect.height / 2
	}
}
