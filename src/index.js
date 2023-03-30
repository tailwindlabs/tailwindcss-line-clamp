const semver = require('semver')
const tailwindPkg = require('tailwindcss/package.json')
const plugin = require('tailwindcss/plugin')

const baseStyles = {
  overflow: 'hidden',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
}

const lineClamp = plugin(
  function ({ matchUtilities, addUtilities, theme, variants }) {
    if (semver.gte(tailwindPkg.version, '3.3.0')) {
      console.log(
        `\u001b[31m${[
          'As of Tailwind CSS v3.3, the `@tailwindcss/line-clamp` plugin is now included by default.',
          'Remove it from the `plugins` array in your configuration to eliminate this warning.',
        ].join('\n')}\u001b[0m`
      )

      return
    }

    const values = theme('lineClamp')

    matchUtilities(
      {
        'line-clamp': (value) => ({
          ...baseStyles,
          '-webkit-line-clamp': `${value}`,
        }),
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
