const transitionEnd = 'transitionend'

export const emulateTransitionEnd = (element: Element, callback: (e: Element) => void, duration: number) => {
	let callbackCalled = false

	const eventCallback = () => {
		if (!callbackCalled) {
			callback.call(element, element)
			callbackCalled = true
			element.removeEventListener(transitionEnd, eventCallback, false)
		}
	}
	const timeoutCallback = () => {
		if (!callbackCalled) {
			const event = new TransitionEvent(transitionEnd)

			element.dispatchEvent(event)
		}
	}

	element.addEventListener(transitionEnd, eventCallback, false)

	if (!transitionEnd) {
		// For older browsers that don't support transitions, we want the callback to be triggered instantly as we don't
		// provide transition fallback using js-powered animations. However, we don't want to trigger the callback
		// instantaneously since the transition might not have even started at this point. By zeroing the duration, we
		// can wait for that to happen.
		duration = 0
	}
	setTimeout(timeoutCallback, duration)
}
