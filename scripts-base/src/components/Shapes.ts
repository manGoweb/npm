import { Component } from '../Component'

export interface ShapesProps {
	url: string
}

/**
 * Shapes component class
 *
 * - injects SVG sprite into body
 */
export class Shapes extends Component<ShapesProps> {
	static componentName = 'Shapes'

	init() {
		document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') &&
			this.injectSprite()
	}

	injectSprite(): void {
		fetch(this.props.url)
			.then((response: Response) => {
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				return response.text()
			})
			.then((shapes: string) => {
				const wrapper = document.createElement('div')
				const body = document.body

				wrapper.innerHTML = shapes

				const el = wrapper.children.item(0)
				if (el) {
					body.insertBefore(el, body.firstChild)
				}
			})
			.catch(() => {
				setTimeout(() => this.injectSprite(), 1e4)
			})
	}
}
