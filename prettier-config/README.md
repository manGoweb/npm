# `@mangoweb/prettier-config`

The manGoweb Prettier config.

## Installation

```bash
npm install prettier @mangoweb/prettier-config --save-dev
```

⚠️ You might want to also fix the package version so that any potential future backwards incompatibilities don't break your build.
This package is generally intended for live development with the occasional BC break.
Should that affect your application because you failed to fix the version, that's on you.

## Usage

Create a `.prettierrc.js` file in your project root:
```javascript
module.exports = {
    ...require("@mangoweb/prettier-config"),
    // Add any project-specific overrides
    // E.g. semi: false
}
```
