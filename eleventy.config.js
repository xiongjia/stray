const {
  strayLog,
  strayInit11tyPlugins,
  strayInit11tyTansform,
  strayInit11tyFilter,
  strayInit11tyLib,
  strayInit11tyEvent,
  strayBuildConf,
} = require('./config/eleventy.infra.js')

module.exports = (cfg) => {
  strayLog('Stray 11ty build conf')
  strayInit11tyTansform(cfg)
  strayInit11tyPlugins(cfg)
  strayInit11tyFilter(cfg)
  strayInit11tyLib(cfg)
  strayInit11tyEvent(cfg)
  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: strayBuildConf.pathContent,
      includes: strayBuildConf.pathInclude,
      data: strayBuildConf.pathData,
      output: strayBuildConf.pathDist,
    },
  }
}
