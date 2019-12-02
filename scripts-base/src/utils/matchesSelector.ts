export const matchesSelector = (element: Element, selector: string): boolean => {
	let matches = false
	try {
		matches = (element.matches || element.msMatchesSelector).call(element, selector)
	} catch (e) {
		// Fails on invalid or unknown selectors
	}
	return matches
}
