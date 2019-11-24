import { Component } from '@mangoweb/scripts-base'
import { lightBounds } from 'light-bounds'

interface ParallaxProps {
	customProperty?: string
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
		const offset = clamp(-1, (this.getElementYCenter() - (window.scrollY + window.innerHeight / 2)) / reachDistance, 1)

		this.el.style.setProperty(`--${this.getPropOrElse('customProperty', 'parallax')}`, `${offset}`)
	}

	getElementYCenter = () => {
		const rect = lightBounds(this.el)
		return window.scrollY + rect.top + rect.height / 2
	}
}
