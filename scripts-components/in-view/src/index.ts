import { Component, ComponentInitializationError } from '@mangoweb/scripts-base'
import { IsInView, isInView, isOutOfView, isSupported } from 'isinview'

interface InViewData {
	targets?: string
	threshold?: number

	isAboveViewClass?: string
	isInViewClass?: string
	isBelowViewClass?: string
	isSeenClass?: string
}

export class InView extends Component<InViewData> {
	static componentName = 'InView'

	protected readonly targets: IsInView.Target
	protected readonly options: Partial<IsInView.Options> = {}

	protected readonly isAboveViewClass: string
	protected readonly isInViewClass: string
	protected readonly isBelowViewClass: string
	protected readonly isSeenClass: string

	public constructor(el: HTMLElement, data: InViewData) {
		super(el, data)

		if (!isSupported()) {
			throw new ComponentInitializationError('InView component not supported. Add IntersectionObserver polyfill.')
		}

		this.targets = this.data.targets ? this.getChildren(this.data.targets) : this.el

		if (this.data.threshold) {
			this.options.threshold = this.data.threshold
		}

		this.isAboveViewClass = this.getProp('isAboveViewClass', 'is-aboveView')
		this.isInViewClass = this.getProp('isInViewClass', 'is-inView')
		this.isBelowViewClass = this.getProp('isBelowViewClass', 'is-belowView')
		this.isSeenClass = this.getProp('isSeenClass', 'is-seen')
	}

	public init() {
		isInView(
			this.targets,
			(target, details) => {
				target.classList.add(this.isSeenClass)
				this.togglePositionClasses(target, details)
			},
			this.options
		)

		isOutOfView(
			this.targets,
			(target, details) => {
				this.togglePositionClasses(target, details)
			},
			this.options
		)
	}

	private togglePositionClasses(target: Element, details: IsInView.Details) {
		this.toggleClass(target, this.isAboveViewClass, details.isAboveView)
		this.toggleClass(target, this.isInViewClass, details.isInView)
		this.toggleClass(target, this.isBelowViewClass, details.isBelowView)
	}

	private toggleClass(target: Element, className: string, force: boolean) {
		if (className) {
			if (force) {
				target.classList.add(className)
			} else {
				target.classList.remove(className)
			}
		}
	}
}
