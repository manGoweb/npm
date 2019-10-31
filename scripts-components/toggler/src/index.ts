import { Component, EventListeners, DelegateEvent } from '@mangoweb/scripts-base'

// data-target
// data-class-name
// data-toggle-others
// data-prevent-default

export default class Toggler extends Component<void> {
	static componentName = 'Toggler'

	getListeners = (): EventListeners => [['click', '.toggler', this.handleClick]]

	handleClick(e: DelegateEvent<'click'>) {
		const delegateTarget = e.delegateTarget as HTMLElement
		const targetSelector = delegateTarget.dataset.target
		const othersTargetSelector = delegateTarget.dataset.closeOthers
		const toggleTarget = targetSelector ? document.querySelector(targetSelector) : delegateTarget
		const closeOthersTargets = othersTargetSelector
			? document.querySelectorAll(othersTargetSelector)
			: null
		const preventDefault = delegateTarget.dataset.preventDefault
		const className = delegateTarget.dataset.className || 'is-active'
		const tagContent = delegateTarget.dataset.tagContent || false

		if (preventDefault) {
			e.preventDefault()
		}

		if (closeOthersTargets) {
			for (let i = 0; i < closeOthersTargets.length; i++) {
				const target = closeOthersTargets[i];
				if (target !== toggleTarget) {
					target.classList.remove(className)
				}
			}
		}

		if (toggleTarget) {
			toggleTarget.classList.toggle(className)
		}

		if (tagContent) {
			const content = delegateTarget.innerText
			delegateTarget.innerText = tagContent
			delegateTarget.dataset.tagContent = content
		}
	}
}
