interface Element {
	msMatchesSelector(selectors: string): boolean
}

interface HTMLElementEventMap {
	focusin: FocusEvent
	focusout: FocusEvent
}
