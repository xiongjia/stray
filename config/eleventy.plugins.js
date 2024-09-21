const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
const { strayBuildConf } = require('./const.js')

const strayInit11tyPlugins = (cfg) => {
  cfg.addPlugin(require('@11ty/eleventy-navigation'))
  cfg.addPlugin(EleventyHtmlBasePlugin)
  cfg.addPlugin(require('@11ty/eleventy-plugin-bundle'))
  cfg.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
    templateFormats: ['md'],
  })
  cfg.addPlugin(require('@11ty/eleventy-plugin-directory-output'), {
    columns: { filesize: true, benchmark: true },
    warningFileSize: strayBuildConf.warningFileSize,
  })
}

module.exports = {
  strayInit11tyPlugins,
}
