const { strayBuildConf } = require('./const.js')

const strayLog = (data) => {
  console.log(`[stray] ${data}`)
}

const makePostCssPlugs = () => {
  const tailwindcss = require('tailwindcss')
  const cssnano = require('cssnano')
  const cssnanoPreset = require('cssnano-preset-lite')
  const postcssPurgecss = require('@fullhuman/postcss-purgecss')
  return [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-import'),
    tailwindcss({
      darkMode: 'class',
      content: [`${strayBuildConf.dist}/**/*.html`],
    }),
    postcssPurgecss({
      content: [`${strayBuildConf.dist}/**/*.html`],
    }),
    cssnano({
      preset: cssnanoPreset({
        discardComments: { removeAll: true },
      }),
    }),
  ]
}

const processPostcss = async ({ cssEntry }) => {
  const fs = require('node:fs/promises')
  const postcss = require('postcss')

  const cssDist = strayBuildConf.makeDistPath('bundle.css')
  const cssMapDist = strayBuildConf.makeDistPath('bundle.css.map')
  strayLog(`Postcss input ${cssEntry} => ${cssDist} / ${cssMapDist}`)
  const plugins = makePostCssPlugs()
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

module.exports = {
  strayLog,
  processPostcss,
}
