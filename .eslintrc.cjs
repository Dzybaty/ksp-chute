module.exports = {
	env: {
      browser: true,
      es2021: true
  },
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript'],
  overrides: [],
  parserOptions: {
      ecmaVersion: 'latest',
      project: './tsconfig.json',
      parser: '@typescript-eslint/parser',
  },
  plugins: [ 'react', '@typescript-eslint' ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
  },
}
