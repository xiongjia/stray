const esbuild = require('esbuild')
const { strayBuildConf } = require('./const.js')

const { strayLog, processPostcss } = require('./misc.js')

const strayPostcss = async () => {
  const cssEntry = strayBuildConf.makeContentPath('_includes/style/stray.css')
  await processPostcss({ cssEntry })
}

const strayEsBuild = async () => {
  const jsEntry = strayBuildConf.makeContentPath('_includes/js/stray.mjs')
  const jsDist = strayBuildConf.makeDistPath('bundle.js')
  strayLog(`JS input ${jsEntry}`)
  await esbuild.build({
    entryPoints: [jsEntry],
    bundle: true,
    outfile: jsDist,
    sourcemap: true,
    minify: true,
  })
}

const strayPagFind = async () => {
  strayLog('init page find')
  const pagefind = await import('pagefind')
  const { index } = await pagefind.createIndex()
  await index.addDirectory({ path: strayBuildConf.dist })
  await index.writeFiles({
    outputPath: strayBuildConf.makeDistPath('pagefind'),
  })
}

const strayInit11tyEvent = (cfg) => {
  cfg.on('eleventy.after', async () => {
    await strayPostcss()
    await strayEsBuild()
    await strayPagFind()
  })
}

module.exports = { strayInit11tyEvent }
