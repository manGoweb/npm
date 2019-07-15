import { Component } from '../Component'

interface InViewProps {
	targets?: string
	threshold?: number
	detectOnce?: boolean
	strictTop?: boolean
	afterUpdate: (isTop: boolean, isBottom: boolean) => void
}

export class InView extends Component<InViewProps> {
	static componentName = 'InView'

	private readonly targets: NodeListOf<Element> | HTMLElement[]
	private readonly threshold: number
	private readonly detectOnce: boolean
	private readonly strictTop: boolean

	private readonly CLASSES = {
		topThreshold: 'view-topThreshold',
		bottomThreshold: 'view-bottomThreshold',
	} as const

	public constructor(el: HTMLElement, props: InViewProps) {
		super(el, props)

		this.targets = props.targets ? this.el.querySelectorAll(props.targets) : [this.el]
		this.threshold = this.getPropOrElse('threshold', 0)
		this.detectOnce = this.getPropOrElse('detectOnce', true)
		this.strictTop = this.getPropOrElse('strictTop', false)

		if ('IntersectionObserver' in window) {
			this.observerInit()
		} else {
			this.onScrollInit()
		}
	}

	private observerInit() {
		const observer = new IntersectionObserver(
			entries => {
				//callback
				entries.forEach(entry => {
					if (!entry.rootBounds) {
						return
					}
					const target = entry.target
					const intersectionRatio = entry.intersectionRatio
					this._updateState(target, intersectionRatio, entry.boundingClientRect.top < entry.rootBounds.height / 2)
				})
			},
			{
				//options
				threshold: this.threshold === 0 ? [0] : [0, this.threshold],
			}
		)

		for (let i = 0, length = this.targets.length; i < length; i++) {
			observer.observe(this.targets[i])
		}
	}

	private onScrollInit() {
		window.addEventListener('scroll', () => {
			window.requestAnimationFrame(() => {
				for (let i = 0, length = this.targets.length; i < length; i++) {
					const target = this.targets[i]
					const targetRect = target.getBoundingClientRect()
					const targetArea = targetRect.width * targetRect.height
					const intersectionArea =
						Math.max(
							0,
							Math.min(targetRect.left + targetRect.width, window.innerWidth) - Math.max(targetRect.left, 0)
						) * // width
						Math.max(0, Math.min(targetRect.top + targetRect.height, window.innerHeight) - Math.max(targetRect.top, 0)) // height
					const intersectionRatio = intersectionArea / targetArea
					this._updateState(target, intersectionRatio, targetRect.top < window.innerHeight / 2)
				}
			})
		})
		window.scrollTo(window.scrollX, window.scrollY)
	}

	_updateState(target: any, intersectionRatio: number, targetTopAboveViewCenter: boolean) {
		const hasTopClassThreshold: boolean = target.classList.contains(this.CLASSES.topThreshold)
		const hasBottomClassThreshold: boolean = target.classList.contains(this.CLASSES.bottomThreshold)
		const strictTop = this.props.hasOwnProperty('detectOnce') && this.props.strictTop ? this.threshold : 0
		const topThreshold = hasTopClassThreshold ? strictTop : this.threshold
		const isTop =
			(this.detectOnce && hasTopClassThreshold) || (intersectionRatio > topThreshold || targetTopAboveViewCenter)
		const isBottom =
			(this.detectOnce && hasBottomClassThreshold) || (intersectionRatio <= this.threshold && targetTopAboveViewCenter)
		target.classList.toggle(this.CLASSES.topThreshold, isTop)
		target.classList.toggle(this.CLASSES.bottomThreshold, isBottom)
		if (this.props.afterUpdate) {
			this.props.afterUpdate(isTop, isBottom)
		}
	}
}
