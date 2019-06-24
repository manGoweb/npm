# `@mangoweb/eslint-config-ts`

ESLint configuration using Prettier designed for TS.

## Installation

1) Install the config:
    `$ npm install @mangoweb/eslint-config-ts --save-dev`
2) And its peer dependencies:
    `$ npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier --save-dev`
3) If you want to use the manGoweb prettier config, also run
    `$ npm install @mangoweb/prettier-config --save-dev`

⚠️ You might want to also fix the package version so that any potential future backwards incompatibilities don't break your build.
This package is generally intended for live development with the occasional BC break.
Should that affect your application because you failed to fix the version, that's on you.

## Usage

1) Create a `.prettierrc.js` file in your project root:
    ```javascript
    module.exports = {
        ...require("@mangoweb/prettier-config"), // Or something else
        // Add any project-specific overrides
        // E.g. semi: false
    }
    ```
2) Create a `.eslintrc.js` in your project root:
    ```javascript
    module.exports = {
        extends:  [
            '@mangoweb/eslint-config-ts',
        ]
    }
    ```
3) Configure your ide to use these files. It will likely find them automatically though.

Optionally, also add these to your `package.json`:
```json
{
    "scripts": {
        "eslint:lint": "eslint \"src/**/*.{ts,tsx}\" ",
        "eslint:fix": "eslint --fix \"src/**/*.{ts,tsx}\" "
    }
}
```

That's it!

