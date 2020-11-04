# InView

The manGoweb Parallax component. Watches elements vertical position in viewport.

## Installation

`$ npm install @mangoweb/parallax @mangoweb/scripts-base`

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## Usage

In your template:

```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'Parallax',
		place: '#targetElement',
		props: {
			// Optional
			customProperty: 'position', // Custom property name
		},
	})
</script>
```

In your styles

```css
#targetElement {
	transform: translateY(calc(var(--position, 0) * 20vh)); // Translates by 0 pixels when javascript is disabled
}
```
