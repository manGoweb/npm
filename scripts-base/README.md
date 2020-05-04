# `@mangoweb/scripts-base`

The manGoweb template for scripts employed on small to medium sized projects.

## Installation

`$ npm install @mangoweb/scripts-base`

⚠️ You might want to also fix the package version so that any potential future backwards incompatibilities don't break your build.
This package is generally intended for live development with the occasional BC break.
Should that affect your application because you failed to fix the version, that's on you.


## Usage

### How to use a component

In your `index.ts` file (or equivalent), use:
```typescript
import { initializeComponents } from '@mangoweb/scripts-base'

import { MyComponent } from './components/MyComponent'

initializeComponents(
	[
		MyComponent
	],
	'initComponents'
)
```
In your template:
```html
<script>
	window.initComponents = (window.initComponents || []).push({
		name: 'MyComponent', // As specified by `displayName`
		place: '#myDiv', // A selector or an element, e.g. `document.body`
		data: { // Any data, as required by the component
			foo: 123
		}
	})
</script>
```

### How to write a component

You must:
- Inherit from `Component`
- Define `static componentName: string`
```typescript
import { Component, DelegateEvent, EventListeners } from '@mangoweb/scripts-base'

interface MyComponentData {
	foo: number
}

export class MyComponent extends Component<MyComponentData> {
	public static componentName = 'MyComponent'

	protected getListeners = (): EventListeners => [
		['click', this.handleClick],
		['click', '.delegateSelector', this.handleDelegateClick],
		// …
	]

	// The type of the argument depends on the actual event.
	// It could also be, for instance, a KeyboardEvent
	private handleClick(event: MouseEvent) {
		console.log('clicked', this.data.foo)
	}

	// Careful: this only works for events that bubble.
	private handleDelegateClick(event: DelegateEvent<'click'>) {
		console.log('delegate target', event.delegateTarget)
	}
}
```

The `Component` superclass accepts up to three generic parameters, all of which are optional. The first one, the
structure of `data`, defaults to `{}`. The second one is the type of `el`. It defaults to `HTMLElement` but is useful
to change when we want to assert that it is something else (e.g. `Window`, `HTMLBodyElement`, `SVGElement`, etc.).

The last parameter should only be necessary to change in very extreme situations. It is the map from supported event
types to their respective `Event` objects. It should be inferred from the type of `el`, although it may be necessary
to change, should the standard library prove to be incomplete.

The `EventListeners` return type of `getListeners` optionally accepts the same two parameters as the last two of
`Components`. It may be necessary to specify one or both if inference fails.

#### Life-cycle methods
The following happens to your component during initialization (in that order):
1) The `constructor` is called (if it exists) as your component is instantialized.
2) Event listeners are attached
3) The `init` method is called (if it exists)

You typically don't need to implement a `constructor` but it can be useful to avoid TS2564.

#### Failed initialization
If for whatever reason you decide that the component is unable to run, just throw a `ComponentInitializationError` from either the `constructor` or the `init` method.
You don't need to worry about any impact on production environment ‒ the error is always caught and its message only displayed when `DEBUG` is `true`.

Valid reasons for yielding and error include:
- Invalid `data` supplied
- A crucial element in the DOM is not found
- A crucial API is not present

#### More specific `el`

Optionally, you can also make an assertion that the element the component is attached to is an instance of a more specific interface than `HTMLElement`.
To that end, you may supply the second generic parameter.

For example, to attach your component on a `<form>`, you can use `Component<MyComponentData, HTMLFormElement>`.

To achieve something similar for `el`'s children, you can use `getChild` or `getChildren`:
```typescript
const link: HTMLAnchorElement = this.getChild('.myLink', HTMLAnchorElement)
```

#### Property defaults
To get a property value with a default, you can use `getProp`. For example:
```typescript
const isEnabled = this.getProp('isEnabled', true)
```

## Pre-defined Components

You can import these and use them via `initializeComponents` side by side with your regular components (baring any potential naming conflicts):

```typescript
import { HidingHeader } from `@mangoweb/hiding-header`
import { InView } from `@mangoweb/in-view`
import { Shapes } from `@mangoweb/shapes`
import { ShapesFallback } from `@mangoweb/shapes-fallback`
```

There are currently these:
- Emitter
- [HidingHeader](https://www.npmjs.com/package/@mangoweb/hiding-header)
- [InView](https://www.npmjs.com/package/@mangoweb/in-view)
- [Shapes](https://www.npmjs.com/package/@mangoweb/shapes)
- [ShapesFallback](https://www.npmjs.com/package/@mangoweb/shapes-fallback)
