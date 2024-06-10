const fs = require('node:fs/promises')
const path = require('node:path')

const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const postcssAutoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssPurgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')
const cssnano = require('cssnano')
const cssnanoPreset = require('cssnano-preset-lite')

const { strayLog } = require('./eleventy.infra.config.js')

const strayPostcss = async () => {
  const cssEntry = path.join(__dirname, 'content/_includes/style/stray.css')
  strayLog(`Postcss input ${cssEntry}`)

  const cssDist = path.join(__dirname, 'dist/bundle.css')
  const cssMapDist = path.join(__dirname, 'dist/bundle.css.map')

  const plugins = [
    postcssAutoprefixer,
    postcssNested,
    postcssImport,
    tailwindcss({
      content: ['./dist/**/*.html'],
    }),
    postcssPurgecss({
      content: ['./dist/**/*.html'],
    }),
    cssnano({
      preset: cssnanoPreset({
        discardComments: { removeAll: true },
      }),
    }),
  ]

  const cssContent = await fs.readFile(cssEntry)
  const result = await postcss(plugins).process(cssContent, {
    map: { inline: false, annotation: true },
    to: cssDist,
    from: cssEntry,
  })

  await fs.writeFile(cssDist, result.css)
  if (result.map) {
    await fs.writeFile(cssMapDist, result.map.toString())
  }
}

const strayInit11tyEvent = (cfg) => {
  cfg.on('eleventy.after', async () => {
    await strayPostcss()
  })
}

module.exports = { strayInit11tyEvent }
