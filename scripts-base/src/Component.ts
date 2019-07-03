import {
	ComponentEl,
	DelegateEvent,
	DelegateTarget,
	EventListeners,
	EventMap,
	EventMapByElement,
} from './componentTypes'
import { matchesSelector } from './utils'

export interface ComponentConstructor<
	Data,
	ComponentElement extends ComponentEl,
	EMap extends EventMap = EventMapByElement<ComponentElement>
> {
	componentName: string
	new (element: ComponentElement, data: Data): Component<Data, ComponentElement, EMap>
}

export class ComponentInitializationError extends Error {}

export class Component<
	Data = {},
	ComponentElement extends ComponentEl = HTMLElement,
	EMap extends EventMap = EventMapByElement<ComponentElement>
> {
	protected readonly getListeners = (): EventListeners<ComponentElement, EMap> => []

	constructor(protected readonly el: ComponentElement, protected readonly data: Data) {}

	public setup() {
		this.attachListeners()
		this.init()
	}

	protected getChild<Child extends DelegateTarget<ComponentElement>>(
		selector: string,
		ChildConstructor: new (...args: any[]) => Child,
		parent: HTMLElement | SVGElement = this.el as HTMLElement | SVGElement
	): Child {
		const child = parent.querySelector(selector)

		if (!(child instanceof ChildConstructor)) {
			throw new ComponentInitializationError(
				`The child element matching '${selector}' is not an instance of the supplied constructor.`
			)
		}
		return child
	}

	protected getChildren<Children extends DelegateTarget<ComponentElement>>(
		selector: string,
		parent = this.el as HTMLElement | SVGElement
	) {
		return parent.querySelectorAll(selector) as NodeListOf<Children>
	}

	protected getProp<PropName extends keyof Data>(
		prop: PropName,
		defaultValue: Exclude<Data[PropName], undefined>
	): Exclude<Data[PropName], undefined> {
		return this.data[prop] === undefined ? defaultValue : (this.data[prop] as Exclude<Data[PropName], undefined>)
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
								const delegateEvent = (e as unknown) as DelegateEvent<typeof type, ComponentElement, EMap>
								delegateEvent.delegateTarget = target as DelegateTarget<ComponentElement>

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
