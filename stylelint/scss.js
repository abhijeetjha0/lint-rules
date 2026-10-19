import cssConfig from './css.js';

/** @type {import('stylelint').Config} */
export default {
  ...cssConfig,
  extends: [
    './css.js',
    'stylelint-config-standard-scss',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    ...cssConfig.rules,
    // SCSS Specifics
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'max-nesting-depth': [
      4,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes'],
      },
    ],
    // Turn off standard at-rule-no-unknown to let scss/at-rule-no-unknown handle it
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
  },
};
