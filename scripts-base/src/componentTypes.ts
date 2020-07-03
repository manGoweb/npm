export type ComponentEl = HTMLElement | SVGElement | Window

export type DefaultComponentEl = HTMLElement

export type EventMapByElement<E extends ComponentEl> = E extends Window
	? WindowEventMap
	: E extends SVGElement
	? SVGElementEventMap
	: E extends HTMLBodyElement
	? HTMLBodyElementEventMap
	: E extends HTMLVideoElement
	? HTMLMediaElementEventMap
	: E extends HTMLAudioElement
	? HTMLMediaElementEventMap
	: E extends HTMLElement
	? HTMLElementEventMap
	: never

export type DelegateTarget<Container extends ComponentEl> = Container extends Window
	? HTMLElement | SVGElement
	: Container extends SVGElement
	? SVGElement
	: Container extends HTMLElement
	? HTMLElement | SVGElement
	: never

export type EventMap =
	| WindowEventMap
	| SVGElementEventMap
	| HTMLBodyElementEventMap
	| HTMLMediaElementEventMap
	| HTMLElementEventMap

export type CompleteEventMap = WindowEventMap &
	SVGElementEventMap &
	HTMLBodyElementEventMap &
	HTMLMediaElementEventMap &
	HTMLElementEventMap

export type NonBubblingEventType =
	| 'abort'
	| 'blur'
	| 'error'
	| 'focus'
	| 'load'
	| 'loadend'
	| 'loadstart'
	| 'progress'
	| 'scroll'

export type BubblingEventType<EMap extends EventMap> = Exclude<keyof EMap, NonBubblingEventType>

export type DelegateEvent<
	E extends BubblingEventType<EMap>,
	Container extends ComponentEl = DefaultComponentEl,
	EMap extends EventMap = EventMapByElement<Container>
> = EMap[E] & {
	delegateTarget: DelegateTarget<Container>
}

export type DelegateEventListenerCallback<
	E extends BubblingEventType<EMap>,
	Container extends ComponentEl = DefaultComponentEl,
	EMap extends EventMap = EventMapByElement<Container>
> = (event: DelegateEvent<E, Container, EMap>) => void

export type DelegateEventListenerSpec<
	E extends BubblingEventType<EMap>,
	Container extends ComponentEl = DefaultComponentEl,
	EMap extends EventMap = EventMapByElement<Container>
> = [E, string, DelegateEventListenerCallback<E, Container, EMap>]

export type EventListenerCallback<E extends keyof EMap, EMap extends EventMap> = (event: EMap[E]) => void

export type EventListenerSpec<E extends keyof EMap, EMap extends EventMap> = [E, EventListenerCallback<E, EMap>]

export type EventListeners<
	Container extends ComponentEl = DefaultComponentEl,
	EMap extends EventMap = EventMapByElement<Container>
> = Array<
	| { [E in keyof EMap]: EventListenerSpec<E, EMap> }[keyof EMap]
	| { [E in BubblingEventType<EMap>]: DelegateEventListenerSpec<E, Container, EMap> }[BubblingEventType<EMap>]
>
