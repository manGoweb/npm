# Share

The manGoweb Share component.

## Installation

```bash
npm install @mangoweb/share @mangoweb/scripts-base
```

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## Usage

In your template:

```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'Share',
		props: {
			// optional
			title: 'Example web',
			url: 'https://example.com',
			fallbackClipboardNote: 'Url copied to clipboard.',
		},
	})
</script>
```
