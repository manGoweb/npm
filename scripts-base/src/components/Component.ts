import { matchesSelector } from '../utils'

export interface NamedComponent {
	componentName: string
}

export type ComponentConstructor<D, E extends HTMLElement = HTMLElement> = NamedComponent &
	(new (element: E, data: D) => Component<D, E>)

export class ComponentInitializationError extends Error {}

export class Component<D, E extends HTMLElement = HTMLElement> {

	protected getListeners = (): EventListeners => []

	constructor(
		protected readonly el: E,
		protected readonly data: D) {}

	public setup() {
		this.attachListeners()

		this.init()
	}

	protected getChild<C extends HTMLElement>(
		selector: string,
		ChildConstructor: Constructor<C>,
		parent: HTMLElement = this.el
	): C {
		const child = parent.querySelector(selector)

		if (!(child instanceof ChildConstructor)) {
			throw new ComponentInitializationError(
				`The child element matching '${selector}' is not an instance of the supplied constructor.`
			)
		}
		return child
	}

	protected getChildren<C extends HTMLElement>(selector: string, parent: HTMLElement = this.el) {
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
				const [type, callback] = listenersSpec

				this.el.addEventListener<typeof type>(type, callback.bind(this) as EventListenerCallback<typeof type>, false)
			} else {
				// DelegateEventListenerSpec
				const [type, delegateSelector, callback] = listenersSpec

				this.el.addEventListener(
					type,
					(e: HTMLElementEventMap[typeof type]) => {
						let target = e.target

						while (target && target instanceof HTMLElement && target !== this.el) {
							if (matchesSelector(target, delegateSelector)) {
								const delegateEvent: HTMLElementEventMap[typeof type] & {
									delegateTarget?: HTMLElement
								} = e
								delegateEvent.delegateTarget = target

								return (callback as DelegateEventListenerCallback<typeof type>).call(
									this,
									delegateEvent as DelegateEvent<typeof type>
								)
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
