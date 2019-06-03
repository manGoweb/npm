type NonBubblingEventType =
	| 'abort'
	| 'blur'
	| 'error'
	| 'focus'
	| 'load'
	| 'loadend'
	| 'loadstart'
	| 'progress'
	| 'scroll'

type BubblingEventType = Exclude<keyof HTMLElementEventMap, NonBubblingEventType>

type DelegateEvent<E extends BubblingEventType> = HTMLElementEventMap[E] & {
	delegateTarget: HTMLElement
}

type DelegateEventListenerCallback<E extends BubblingEventType> = (event: DelegateEvent<E>) => void

type DelegateEventListenerSpec<E extends BubblingEventType> = [
	E,
	string,
	DelegateEventListenerCallback<E>
]

type EventListenerCallback<E extends keyof HTMLElementEventMap> = (event: HTMLElementEventMap[E]) => void

type EventListenerSpec<E extends keyof HTMLElementEventMap> = [E, EventListenerCallback<E>]

type EventListeners = Array<
	| { [E in keyof HTMLElementEventMap]: EventListenerSpec<E> }[keyof HTMLElementEventMap]
	| { [E in BubblingEventType]: DelegateEventListenerSpec<E> }[BubblingEventType]
>

type Constructor<T> = new (...args: any[]) => T

interface Element {
	msMatchesSelector(selectors: string): boolean
}

interface HTMLElementEventMap {
	focusin: FocusEvent
	focusout: FocusEvent
}
