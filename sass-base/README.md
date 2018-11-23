# `@mangoweb/sass-base`

The manGoweb template for sass styles employed on small to medium sized projects.
It defines abstract definitions, animation keyframes, functions, mixins, a global reset as well as a couple of other utility classes.

## Installation

`$ npm install @mangoweb/sass-base`

⚠️ You might want to also fix the package version so that any potential future backwards incompatibilities don't break your build.
This package is generally intended for live development with the occasional BC break.
Should that affect your application because you failed to fix the version, that's on you.

## Usage

### Basic use
If you don't wish to modify anything, just import everything:
```sass
@import '~@mangoweb/sass-base/index'
```

### More advanced use
To gain a finer control over what and how is imported, you might want to follow these steps:
1) Create a `_variable.sass` file from which you can override any variable defined in `~@mangoweb/sass-base/variables`.
2) Create a `_common.sass` file:
	```sass
	@import 'variables'
	@import '~@mangoweb/sass-base/common'
	```
	This allows you to define your variables before you import `sass-base`, thereby overriding its defaults.
	 
	You should later import this file from all your other files (e.g. other components) in order to avoid relying on implicit importing.
3) Create an `index.sass` file:
	```sass
	@import 'common'
	@import '~@mangoweb/sass-base/index'
	
	/* Any other components of yours */
	@import 'parts/…'
	```

### Defined functions

#### `em`
Turns a (potentially unitless) number in pixels into em
Usage:
- `em(16)` returns `1em` (based on `$font-size`)
- `em(16px)` returns `1em` (based on `$font-size`)
- `em(10px)` returns `.625em` (based on `$font-size`)
- `em(10px, 10px)` returns `1em`
where `$font-size` is the second parameter which defaults to `$base-font-size`, which is typically `16px`.

#### `rem`
Turns a (potentially unitless) number in pixels into rem
Usage:
- `rem(16)` returns `1rem` (based on `$base-font-size`)
- `rem(16px)` returns `1rem` (based on `$base-font-size`)

#### `toScalar`
Converts a dimensioned value to a scalar
```sass
line-height: toScalar(1.5em) // line-height: 1.5
``` 

### Defined mixins

#### `absolute`
Usage:
- `+absolute(top right bottom left)`
- `+absolute(top horizontal bottom)`
- `+absolute(vertical horizontal)`
- `+absolute(offset)`

Examples:
- `+absolute(1px 2px 3px 4px)`
	compiles to
	`// position: absolute; top: 1px; right: 2px; bottom: 3px; left: 4px`
- `+absolute(1px 2px 3px)`
	compiles to
	`// position: absolute; top: 1px; right: 2px; bottom: 3px; left: 2px`
- `+absolute(1px 2px)`
	compiles to
	`// position: absolute; top: 1px; right: 2px; bottom: 1px; left: 2px`
- `+absolute(1px)`
	compiles to
	`// position: absolute; top: 1px; right: 1px; bottom: 1px; left: 1px`
- `+absolute(1px null null 2px)`
	compiles to
	`// position: absolute; top: 1px; left: 2px`

All the other position mixins (`fixed`, `relative`, `sticky`) behave identically

#### `clearFix`
Just a simple clear fix

#### `fixed`
See `absolute`

#### `fluid`
Signature: `fluid($property-name, $min-viewport-width, $max-viewport-width, $min-value, $max-value)`

Allows you to set a property value to a linearly interpolated value with respect to the viewport width.

Example:
```sass
.foo
	+fluid(font-size, 0em, 45em, 0em, 1.5em)
```

#### `media`
A helper mixin for @media queries
	
Usage:
```sass
+media(mediaQuery [, mediaQuery]*)
	foo: bar
	/* … */
```
where mediaQuery is a sass list of one of
- string of a classic css feature query
- unitless number (will be interpreted as the pixel argument for min-width)
- number with a special unit prefix 'M' (e.g. 123Mem) which denotes that max-width is to be emitted
	NOTE: You never want to use this unit explicitly. Instead, use the maxWidth function for conversion. See examples
	      below.

Examples:
- `+media($break480 $break768M, $break992 $break1200M)`
	compiles to 
	`@media (min-width: 30em) and (max-width: 47.96875em), (min-width: 62em) and (max-width: 74.96875em)`
- `+media(123)`
	compiles to
	`@media (min-width: 7.6875em)`
- `+media(123M)
	compiles to
	`@media (max-width: 123px)`
- `+media(123em maxWidth(456em))`
	compiles to
	`@media (min-width: 123em) and (max-width: 455.96875em)`
- `+media($break480 '(screen)', 300 maxWidth(500px), $landscape)`
	compiles to
	`@media (min-width: 30em) and (screen), (min-width: 18.75em) and (max-width: 31.21875em), (orientation: landscape)`

#### `relative`
See `absolute`

#### `size`
Usage
```sass
+size(100%) // width: 100%; height: 100%
+size(123px 456px) // width: 123px; height: 456px
```

#### `sticky`
See `absolute` 

### Defined variables
There are more to list here. Please refer to `_variables.sass`.
