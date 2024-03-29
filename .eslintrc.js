module.exports = {
	env: {
	  browser: true,
	  es2021: true,
	},
	extends: [
	  'plugin:react/recommended',
	],
	parserOptions: {
	  ecmaFeatures: {
			jsx: true,
	  },
	  ecmaVersion: 'latest',
	  sourceType: 'module',
	},
	plugins: ['react', 'react-hooks'],
	ignorePatterns: ['src/*.css'],
	rules: {
	  'react/react-in-jsx-scope': 'off',
	  'react-hooks/rules-of-hooks': 'error',
	  'react-hooks/exhaustive-deps': 'warn',
	  'react/prop-types': 'off',
	},
};
