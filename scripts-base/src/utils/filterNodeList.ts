import { matchesSelector } from './matchesSelector.js'

export const filterNodeList = <E extends HTMLElement>(
	list: NodeListOf<E> | HTMLCollectionOf<E>,
	selector: string
): Array<E> => Array.prototype.filter.call(list, (item: E) => matchesSelector(item, selector))
