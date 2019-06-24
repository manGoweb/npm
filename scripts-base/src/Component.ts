import {
	ComponentEl,
	DelegateEvent,
	DelegateTarget,
	EventListeners,
	EventMap,
	EventMapByElement,
} from './componentTypes'
import { matchesSelector } from './utils'

export interface NamedComponent {
	componentName: string
}

export type ComponentConstructor<
	D,
	E extends ComponentEl,
	EMap extends EventMap = EventMapByElement<E>
> = NamedComponent & (new (element: E, data: D) => Component<D, E, EMap>)

export class ComponentInitializationError extends Error {}

export class Component<D = {}, E extends ComponentEl = HTMLElement, EMap extends EventMap = EventMapByElement<E>> {
	protected readonly getListeners = (): EventListeners<E, EMap> => []

	constructor(protected readonly el: E, protected readonly data: D) {}

	public setup() {
		this.attachListeners()

		this.init()
	}

	protected getChild<C extends DelegateTarget<E>>(
		selector: string,
		ChildConstructor: new (...args: any[]) => C,
		parent: HTMLElement | SVGElement = this.el as HTMLElement | SVGElement
	): C {
		const child = parent.querySelector(selector)

		if (!(child instanceof ChildConstructor)) {
			throw new ComponentInitializationError(
				`The child element matching '${selector}' is not an instance of the supplied constructor.`
			)
		}
		return child
	}

	protected getChildren<C extends DelegateTarget<E>>(selector: string, parent = this.el as HTMLElement | SVGElement) {
		return parent.querySelectorAll(selector) as NodeListOf<C>
	}

	protected getProp<N extends keyof D>(prop: N, defaultValue: Exclude<D[N], undefined>): Exclude<D[N], undefined> {
		return this.data[prop] === undefined ? defaultValue : (this.data[prop] as Exclude<D[N], undefined>)
	}

	public init() {}

	private attachListeners() {
		const listeners = this.getListeners()

		for (let i = 0, listenersCount = listeners.length; i < listenersCount; i++) {
			const listenersSpec = listeners[i]

			if (listenersSpec.length === 2) {
				// EventListenerSpec
				const type = listenersSpec[0] as string
				const callback = (listenersSpec[1].bind(this) as CallableFunction) as (evt: Event) => void

				this.el.addEventListener(type, callback, false)
			} else {
				// DelegateEventListenerSpec
				const [type, delegateSelector, callback] = listenersSpec

				this.el.addEventListener(
					type as string,
					(e: Event) => {
						let target = e.target

						while (target && target !== this.el && target instanceof Element) {
							if (matchesSelector(target, delegateSelector)) {
								const delegateEvent = (e as unknown) as DelegateEvent<typeof type, E, EMap>
								delegateEvent.delegateTarget = target as DelegateTarget<E>

								return callback.call(this, delegateEvent)
							}

							target = target.parentElement
						}
					},
					false
				)
			}
		}
	}
}
