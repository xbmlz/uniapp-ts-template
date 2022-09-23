import presetWeapp from 'unocss-preset-weapp'
import {
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer'
import { defineConfig, presetIcons } from 'unocss'

const transformRules = {
  '.': '-d111-',
  '/': '-s111-',
  ':': '-c111-',
  '%': '-p111-',
  '!': '-e111-',
  '#': '-w111-',
  '(': '-b111l-',
  ')': '-b111r-',
  '[': '-f111l-',
  ']': '-f111r-',
  $: '-r111-',
  ',': '-r222-',
}

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      transformRules,
    }),
    presetIcons({
      scale: 2,
      warn: true,
    }),
  ],
  shortcuts: [],
  transformers: [
    // options https://github.com/MellowCo/unplugin-attributify-to-class
    transformerAttributify({
      // attributes: [...defaultAttributes, 'my-attr'],
      // ignoreNonValuedAttributes: [
      //   ...defaultIgnoreNonValuedAttributes,
      //   'my-ignore',
      // ],
      // nonValuedAttribute: true,
      // prefix: 'li-',
      // prefixedOnly: false,
      transformRules,
    }),

    // options https://github.com/MellowCo/unplugin-transform-class
    transformerClass({
      transformRules,
    }),
  ],
})
