type ComponentEl = HTMLElement | SVGElement | Window

type EventMapByElement<E> =
	E extends Window ? WindowEventMap :
		E extends SVGElement ? SVGElementEventMap :
			E extends HTMLBodyElement ? HTMLBodyElementEventMap :
				E extends HTMLVideoElement ? HTMLVideoElementEventMap :
					E extends HTMLAudioElement ? HTMLMediaElementEventMap :
						E extends HTMLElement ? HTMLElementEventMap : never

type DelegateTarget<Container extends ComponentEl> =
	Container extends Window ? HTMLElement | SVGElement :
		Container extends SVGElement ? SVGElement :
			Container extends HTMLElement ? HTMLElement | SVGElement :
				never

type EventMap =
	WindowEventMap
	| SVGElementEventMap
	| HTMLBodyElementEventMap
	| HTMLVideoElementEventMap
	| HTMLMediaElementEventMap
	| HTMLElementEventMap

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

type BubblingEventType<EMap extends EventMap> = Exclude<keyof EMap, NonBubblingEventType>

type DelegateEvent<E extends BubblingEventType<EMap>, Container extends ComponentEl = HTMLElement, EMap extends EventMap = EventMapByElement<Container>> =
	EMap[E]
	& {
	delegateTarget: DelegateTarget<Container>
}

type DelegateEventListenerCallback<E extends BubblingEventType<EMap>, Container extends ComponentEl, EMap extends EventMap> = (event: DelegateEvent<E, Container, EMap>) => void

type DelegateEventListenerSpec<E extends BubblingEventType<EMap>, Container extends ComponentEl, EMap extends EventMap> = [
	E,
	string,
	DelegateEventListenerCallback<E, Container, EMap>
]

type EventListenerCallback<E extends keyof EMap, EMap extends EventMap> = (event: EMap[E]) => void

type EventListenerSpec<E extends keyof EMap, EMap extends EventMap> = [E, EventListenerCallback<E, EMap>]

type EventListeners<Container extends ComponentEl = HTMLElement, EMap extends EventMap = EventMapByElement<Container>> = Array<{ [E in keyof EMap]: EventListenerSpec<E, EMap> }[keyof EMap]
	| { [E in BubblingEventType<EMap>]: DelegateEventListenerSpec<E, Container, EMap> }[BubblingEventType<EMap>]>

type Constructor<T> = new (...args: any[]) => T
