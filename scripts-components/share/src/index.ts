import { Component, EventListeners } from '@mangoweb/scripts-base'

export interface ShareProps {
	title?: string
	url?: string
	fallbackClipboardNote?: string
}

export class Share extends Component<ShareProps> {
	static componentName = 'Share'

	protected $linkCanonical = this.getProp('url')
		? null
		: document.querySelector<HTMLLinkElement>("link[rel='canonical']")

	getListeners = (): EventListeners => [['click', this.handleClick]]

	async handleClick(event: Event) {
		event.preventDefault()

		const title = this.getPropOrElse('title', document.title)
		const url = this.getPropOrElse('url', this.$linkCanonical?.href || window.location.href)

		if (navigator.share) {
			await navigator.share({ title, url })
		} else if (navigator.clipboard) {
			await navigator.clipboard.writeText(`${title}: ${url}`)
			const note = this.getProp('fallbackClipboardNote')
			if (note) {
				alert(note)
			}
		}
	}
}
