# InView

The manGoweb InView component. Watches elements entering and leaving viewport.

## Installation

`$ npm install @mangoweb/in-view`

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

			isAboveViewClass: 'isAboveViewClass', // Target element last seen above viewport
			isInViewClass: 'isInViewClass', // Target last seen in viewport
			isBelowViewClass: 'isBelowViewClass', // Target last seen below viewport
			isSeenClass: 'isSeenClass', // Target seen in viewport at least once
		}
	})
</script>
```
