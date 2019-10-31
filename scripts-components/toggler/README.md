# Toggler

The manGoweb Toggler component. Toggles class on target element.

## Installation

`$ npm install @mangoweb/toggler @mangoweb/scripts-base`

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## Usage

In your template:
```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'Toggler',
		place: 'body'
	})
</script>
```

Use by adding following attributes to HTML element with 'toggler' class:
* data-target - target selector
* data-class-name - class to toggle
* data-close-others - selector of elements to close
* data-prevent-default - prevent default event behaviour
