module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'no-array-index-key': 0,
    'no-alert': 'off',
    'react/forbid-prop-types': 0,
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'prefer-destructuring': ['error', { object: false, array: false }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['nesting'],
        },
        allowChildren: false,
      },
    ],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    document: true,
    foo: true,
    window: true,
  },
};
