import { Component } from '@mangoweb/scripts-base'
import { hidingHeader } from 'hiding-header'

export interface HidingHeaderProps {}

export class HidingHeader extends Component<HidingHeaderProps> {
	static componentName = 'HidingHeader'

	init() {
		hidingHeader(this.el)
	}
}
