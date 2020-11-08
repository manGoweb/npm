import { Component } from '@mangoweb/scripts-base'
import { lightBounds } from 'light-bounds'

export interface ParallaxProps {
	offsetPropertyName?: string
	heightPropertyName?: string
	windowHeightPropertyName?: string
}

export class Parallax extends Component<ParallaxProps> {
	public static componentName = 'Parallax'

	init() {
		lightBounds(this.el, { onChange: this.update })
		this.update()
	}

	update = () => {
		const windowHeight = window.innerHeight
		const height = this.getElementHeight()
		const offset = this.getElementYCenter() - (window.scrollY + windowHeight / 2)

		this.el.style.setProperty(`--${this.getPropOrElse('offsetPropertyName', 'offset')}`, `${offset}`)
		this.el.style.setProperty(`--${this.getPropOrElse('heightPropertyName', 'height')}`, `${height}`)
		this.el.style.setProperty(`--${this.getPropOrElse('windowHeightPropertyName', 'windowHeight')}`, `${windowHeight}`)
	}

	getElementYCenter = () => {
		const rect = lightBounds(this.el)
		return window.scrollY + rect.top + rect.height / 2
	}

	getElementHeight = () => {
		return lightBounds(this.el).height
	}
}
