const cssMatcher = require('jest-matcher-css')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const defaultOptions = {
  corePlugins: { preflight: false },
  plugins:  [require('../src')],
}

function run(input, config, plugin = tailwindcss) {
  return postcss(
    plugin(config)
  )
  .process(input, {
    from: undefined
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

it('should add the `line-clamp-{n}` components', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="line-clamp-2 line-clamp-[33] line-clamp-[var(--line-clamp-variable)]"></div>` }],
  }

  return run('@tailwind components;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .line-clamp-2 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .line-clamp-\[33\] {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 33;
      }

      .line-clamp-\[var\(--line-clamp-variable\)\] {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--line-clamp-variable);
      }
    `)
  })
})

it('should add the `line-clamp-none` utility', () => {
  const config = {
    ...defaultOptions,
    content: [{ raw: String.raw`<div class="line-clamp-none"></div>` }],
  }

  return run('@tailwind utilities;', config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .line-clamp-none {
        -webkit-line-clamp: unset;
      }
    `)
  })
})