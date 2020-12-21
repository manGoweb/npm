# Parallax

The manGoweb Parallax component. Watches elements vertical position in viewport.

Demo: [codesandbox.io/s/mangowebparallax-demo-hz24v](https://codesandbox.io/s/mangowebparallax-demo-hz24v?file=/index.html)

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
			offsetPropertyName: 'offset', // distance between element y center and window y center
			heightPropertyName: 'height', // element height
			windowHeightPropertyName: 'windowHeight',
		},
	})
</script>
```

In your styles

```css
#targetElement {
	transform: translateY(calc(var(--offset, 0) * 20vh)); // Translates by 0 pixels when javascript is disabled
}
```
