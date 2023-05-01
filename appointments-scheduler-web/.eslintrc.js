module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-unused-vars': 'warn',
    'operator-linebreak': [2, 'before'],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    semi: ['error', 'always'],
    'linebreak-style': 0,
    quotes: ['error', 'single', 'avoid-escape'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-cycle': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'arrow-parens': ['error', 'as-needed'],
    curly: 'off',
    'no-console': 'off',
    'camelcase': 'off',
  },
};
