/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    // Formatting & modern standards
    'color-hex-length': 'short',
    'alpha-value-notation': 'percentage',
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],

    // Property ordering (Positioning -> Box Model -> Typography -> Visuals -> Interaction)
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
    'order/properties-order': [
      [
        // Positioning
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',

        // Display & Flex/Grid Box Model
        'display',
        'flex',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'gap',
        'grid',
        'grid-template-columns',
        'grid-template-rows',

        // Box Model Sizing & Spacing
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',

        // Typography
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'text-align',
        'color',

        // Visuals & Decorations
        'background',
        'background-color',
        'border',
        'border-radius',
        'box-shadow',
        'opacity',

        // Interaction
        'cursor',
        'pointer-events',
        'transition',
        'transform',
      ],
      { unspecified: 'bottomAlphabetical' },
    ],
  },
};
