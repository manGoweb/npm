import { Component } from '@mangoweb/scripts-base'

interface HidingHeaderProps {
	contentSelector?: string
	heightPropertyName?: string
	scrollCapPropertyName?: string
}

const DEFAULT_CONTENT_SELECTOR = '*'
const DEFAULT_HEIGHT_PROPERTY_NAME = '--hidingHeader-height'
const DEFAULT_SCROLL_CAP_PROPERTY_NAME = '--hidingHeader-scrollCap'

export class HidingHeader extends Component<HidingHeaderProps> {
	static componentName = 'HidingHeader'

	protected lastScrollTop = 0
	protected contentHeight = 0
	protected content = this.getChild(this.getPropOrElse('contentSelector', DEFAULT_CONTENT_SELECTOR), HTMLElement)
	protected wasScrollingDown = true
	protected lastScrollCap = 0
	protected heightPropertyName = this.getPropOrElse('heightPropertyName', DEFAULT_HEIGHT_PROPERTY_NAME)
	protected scrollCapPropertyName = this.getPropOrElse('scrollCapPropertyName', DEFAULT_SCROLL_CAP_PROPERTY_NAME)

	getContentHeight() {
		return this.content.clientHeight
	}

	init() {
		window.addEventListener('scroll', this.onScroll)
		window.addEventListener('resize', this.onScroll)
		this.onScroll()
	}

	onScroll = () => {
		const contentHeight = this.getContentHeight() // @TODO: throttle/cache
		if (this.contentHeight !== contentHeight) {
			this.contentHeight = contentHeight
			this.el.style.setProperty(this.heightPropertyName, `${contentHeight}px`)
		}

		const scrollTop = window.scrollY
		const isScrollingDown = scrollTop > this.lastScrollTop
		if (isScrollingDown !== this.wasScrollingDown) {
			const scrollCap = isScrollingDown ? scrollTop : Math.max(0, scrollTop - contentHeight)

			// @TODO: handle changes in scroll direction if header is partially visible

			if (scrollCap !== this.lastScrollCap) {
				this.wasScrollingDown = isScrollingDown
				this.el.style.setProperty(this.scrollCapPropertyName, `${scrollCap}px`)
				this.lastScrollCap = scrollCap
			}
		}
		this.lastScrollTop = scrollTop
	}
}
