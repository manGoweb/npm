# Shapes

The manGoweb Shapes component.

## Installation

`$ npm install @mangoweb/shapes @mangoweb/scripts-base`

This is a [`@mangoweb/scripts-base`](https://www.npmjs.com/package/@mangoweb/scripts-base) component.

## Usage

In your template:

```html
<script>
  window.initComponents = (window.initComponents || []).push({
    name: "Shapes",
    props: {
      url: "/shapes.svg"
    }
  });
</script>
```

## IE support

Use `fetch` polyfill, e.g., `<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch"></script>`