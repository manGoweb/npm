import { Component } from './Component'

type EventType = string
type Events = Array<EventType>

export interface EmitterData {
	events: EventType | Events
}
/**
 * Emitter component class
 *
 * 	- emits given events on an element click
 *
 * Expects data = {
 * 		events: [ 'event', 'names', 'to', 'trigger' ] - array of events or just single string
 * }
 */
export class Emitter extends Component<EmitterData> {
	static componentName = 'Emitter'

	private events: Events = []

	protected getListeners = (): EventListeners => [['click', this.handleClick]]

	public init() {
		this.events = Array.isArray(this.data.events) ? this.data.events : [this.data.events]
	}

	private handleClick(e: MouseEvent) {
		e.preventDefault()

		this.events.map(eventType => {
			const event = document.createEvent('Event')

			event.initEvent(eventType, true, true)

			this.el.dispatchEvent(event)
		})
	}
}
