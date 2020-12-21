# InView

The manGoweb InView component. Watches elements entering and leaving viewport.

## Installation

```bash
npm install @mangoweb/in-view @mangoweb/scripts-base
```

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

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

## IE support / older Safari ([caniuse](https://caniuse.com/#feat=intersectionobserver))

Use `IntersectionObserver` polyfill, e.g., `<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>`
