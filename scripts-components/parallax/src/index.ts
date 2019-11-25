import { Component } from '@mangoweb/scripts-base'
import { lightBounds } from 'light-bounds'

interface ParallaxProps {
	customProperty?: string
}

export class Parallax extends Component<ParallaxProps> {
	public static componentName = 'Parallax'

	init() {
		lightBounds(this.el, { onChange: this.update })
		this.update()
	}

	update = () => {
		const offset = this.getElementYCenter() - (window.scrollY + window.innerHeight / 2)

		this.el.style.setProperty(`--${this.getPropOrElse('customProperty', 'parallax')}`, `${offset}`)
	}

	getElementYCenter = () => {
		const rect = lightBounds(this.el)
		return window.scrollY + rect.top + rect.height / 2
	}
}
