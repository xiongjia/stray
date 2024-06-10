const {
  strayLog,
  strayInit11tyPlugins,
  strayInit11tyTansform,
  strayInit11tyFilter,
  strayInit11tyLib,
} = require('./eleventy.infra.config.js')

const { strayPostcss } = require('./eleventy.css.config.js')

module.exports = (cfg) => {
  strayLog('Stray 11ty build conf')
  strayInit11tyTansform(cfg)
  strayInit11tyPlugins(cfg)
  strayInit11tyFilter(cfg)
  strayInit11tyLib(cfg)
  cfg.on('eleventy.after', async () => {
    strayPostcss()
  })

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'content',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  }
}
