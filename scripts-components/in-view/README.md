# InView

The manGoweb InView component. Watches elements entering and leaving viewport.

## Installation

`$ npm install @mangoweb/in-view @mangoweb/scripts-base`

Works best with [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base).

## Usage

In your template:
```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'InView',
		place: '#targetWrapper', // Element you want to watch or a wrapper
		data: { // Optional
			targets: '.target', // Watched children
			threshold: 0, // Area of a target required to be inside viewport

			isAboveViewClass: 'isAboveView', // Class added to a target element when seen above viewport
			isInViewClass: 'isInView', // Target seen in viewport
			isBelowViewClass: 'isBelowView', // Target seen below viewport
			isSeenClass: 'isSeen', // Target seen in viewport at least once
		}
	})
</script>
```
