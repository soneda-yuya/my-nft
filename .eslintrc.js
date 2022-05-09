module.exports = {
  env: {
    'jest/globals': true,
    browser: false,
    es2021: true,
    mocha: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:node/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }]
  }
}
