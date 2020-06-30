# Hiding Header

The manGoweb HidingHeader component. Hides and reveals header on scroll.

## Installation

`$ npm install @mangoweb/hiding-header @mangoweb/scripts-base`

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## How to use

### In your template:

```html
…
<body>
	<div class="hidingHeader" id="hidingHeader">
		<div class="hidingHeader-in">
			<!-- Your header -->
		</div>
	</div>
	<script>
		window.initComponents = (window.initComponents || []).push({
			name: 'HidingHeader',
			place: '#hidingHeader',
		})
	</script>
	…
</body>
…
```

### Styles:

```css
.hidingHeader {
	position: relative;
	--hidingHeader-height: auto;
	--hidingHeader-bounds-height: auto;
	z-index: 10;
	height: var(--hidingHeader-bounds-height);
	margin-bottom: calc(var(--hidingHeader-height) - var(--hidingHeader-bounds-height));
	pointer-events: none;
}

.hidingHeader-in {
	position: relative;
	position: sticky;
	top: 0;
	pointer-events: auto;
}
```
