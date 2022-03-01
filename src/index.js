const plugin = require('tailwindcss/plugin')

const baseStyles = {
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
}

const lineClamp = plugin(
  function ({ matchUtilities, addUtilities, theme, variants, e }) {
    const values = theme('lineClamp')

    if (matchUtilities) {
      // Tailwind CSS v3.0+
      matchUtilities(
        {
          'line-clamp': (value) => [
            {
              ...baseStyles,
              '-webkit-line-clamp': `${value}`,
            }
          ]
        },
        { values }
      )

      addUtilities(
        [
          {
            '.line-clamp-none': {
              '-webkit-line-clamp': 'unset',
            },
          },
        ],
        variants('lineClamp')
      )

      return
    }

    // Tailwind CSS v2.0+
    addUtilities(
      [
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`line-clamp-${key}`)}`]: {
              ...baseStyles,
              '-webkit-line-clamp': `${value}`,
            },
          }
        }),
        {
          '.line-clamp-none': {
            '-webkit-line-clamp': 'unset',
          },
        },
      ],
      variants('lineClamp')
    )
  },
  {
    theme: {
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    },
    variants: {
      lineClamp: ['responsive'],
    },
  }
)

module.exports = lineClamp
