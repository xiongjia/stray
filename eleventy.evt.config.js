const fs = require('node:fs')
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

const strayPostcss = () => {
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
  fs.readFile(cssEntry, (err, css) => {
    if (err) {
      strayLog(`Load css file ${css} failed, error: ${err}`)
      throw err
    }
    postcss(plugins)
      .process(css, {
        map: { inline: false, annotation: true },
        to: cssDist,
        from: cssEntry,
      })
      .then((result) => {
        fs.writeFileSync(cssDist, result.css)
        if (result.map) {
          fs.writeFileSync(cssMapDist, result.map.toString())
        }
      })
  })
}

const strayInit11tyEvent = (cfg) => {
  cfg.on('eleventy.after', async () => {
    strayPostcss()
  })
}

module.exports = { strayInit11tyEvent }
