module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true  // => no 'no-undef' error for 'describe'/'it' in mocha tests.
  },
  globals: { expect: true },  // No 'no-undef' error for chai's 'expect'.
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: { sourceType: 'module' },
  plugins: ['vue'],
  rules: {
    'indent': ['error',  2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': 'off',
  }
};
