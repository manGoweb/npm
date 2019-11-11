import { Component, EventListeners, DelegateEvent } from '@mangoweb/scripts-base'

interface TogglerData {
	targetSelector: string,
	defaultClassName?: string
}

export default class Toggler extends Component<TogglerData> {
	static componentName = 'Toggler'

	getListeners = (): EventListeners => [['click', this.props.targetSelector, this.handleClick]]

	handleClick(e: DelegateEvent<'click'>) {
		const delegateTarget = e.delegateTarget
		const targetSelector = delegateTarget.dataset.target
		const othersTargetSelector = delegateTarget.dataset.removeOthers
		const toggleTarget = targetSelector ? document.querySelector(targetSelector) : delegateTarget
		const removeOthersTargets = othersTargetSelector ? document.querySelectorAll(othersTargetSelector) : null
		const preventDefault = delegateTarget.dataset.preventDefault
		const className = delegateTarget.dataset.className || this.props.defaultClassName || ''

		if (preventDefault) {
			e.preventDefault()
		}

		if (removeOthersTargets) {
			for (let i = 0; i < removeOthersTargets.length; i++) {
				const target = removeOthersTargets[i]
				if (target !== toggleTarget) {
					target.classList.remove(className)
				}
			}
		}

		if (toggleTarget) {
			toggleTarget.classList.toggle(className)
		}
	}
}
