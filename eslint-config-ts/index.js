module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	plugins: [
		"react-hooks",
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		"@typescript-eslint/array-type": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-object-literal-type-assertion": "off",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/prefer-interface": "off",

		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "error",
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
