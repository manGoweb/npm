import { Component } from '@mangoweb/scripts-base'

export interface ShapesFallbackProps {}

export function isShapesFallbackRequired() {
	const isIE = navigator.userAgent.indexOf('MSIE ') > 0 || navigator.userAgent.indexOf('Trident/') > 0
	return isIE
}

const loadedSymbolsLocations: string[] = []

function loadSymbolsLocation(location: string) {
	loadedSymbolsLocations.push(location)

	const xhr = new XMLHttpRequest()
	xhr.open('GET', location)
	xhr.onload = function() {
		if (xhr.status === 200) {
			const wrapper = document.createElement('div')
			const body = document.body

			wrapper.innerHTML = xhr.response

			const el = wrapper.children.item(0)

			if (el) {
				body.insertBefore(el, body.firstChild)
			}
		}
	}
	xhr.send()
}

export function applyShapesFallbackIfNeeded(parent: HTMLElement) {
	if (!isShapesFallbackRequired()) {
		return
	}

	const shapes = parent.querySelectorAll('svg use')
	for (let i = 0; i < shapes.length; i++) {
		const shape = shapes[i]
		if (!shape.hasAttribute('xlink:href')) {
			continue
		}

		const href = shape.getAttribute('xlink:href') || ''
		const hrefParts = href.split('#')
		if (hrefParts.length < 2) {
			continue
		}

		const symbolsLocation = hrefParts[0]
		const symbolId = hrefParts[1]

		shape.setAttribute('xlink:href', `#${symbolId}`)

		if (loadedSymbolsLocations.indexOf(symbolsLocation) < 0) {
			loadSymbolsLocation(symbolsLocation)
		}
	}
}

export class ShapesFallback extends Component<ShapesFallbackProps> {
	static componentName = 'ShapesFallback'

	init() {
		applyShapesFallbackIfNeeded(document.body)
	}
}
