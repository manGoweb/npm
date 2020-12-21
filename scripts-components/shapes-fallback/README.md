# ShapesFallback

The manGoweb ShapesFallback component.

## Installation

```bash
npm install @mangoweb/shapes-fallback @mangoweb/scripts-base
```

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## Usage

In your template:

```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'ShapesFallback',
	})
</script>
```

or in your js:

```js
import { applyShapesFallbackIfNeeded } from '@mangoweb/shapes-fallback'

const rawHTML = 'something something <svg…> something'
const output = document.querySelector('#output')

output.innerHTML = rawHTML
applyShapesFallbackIfNeeded(output)
```
