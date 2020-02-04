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
			<div class="hidingHeader-content">
				<!-- Your header -->
			</div>
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
	--hidingHeader-height: 0px;
	--hidingHeader-scrollCap: 0px;
	z-index: 10;
	min-height: calc(var(--hidingHeader-scrollCap) + var(--hidingHeader-height));
	margin-bottom: calc(-1 * var(--hidingHeader-scrollCap));
	pointer-events: none;
}

.hidingHeader-in {
	position: relative;
	position: sticky;
	top: 0;
}

.hidingHeader-content {
	pointer-events: auto;
}
```
