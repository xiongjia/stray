const htmlmin = require('html-minifier')

const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginBundle = require('@11ty/eleventy-plugin-bundle')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = { strayLog, strayInit11tyPlugins, strayInit11tyTansform }

const strayLog = (data) => {
  console.log(`[stray] ${data}`)
}

const strayInit11tyPlugins = (cfg) => {
  cfg.addPlugin(pluginNavigation)
  cfg.addPlugin(EleventyHtmlBasePlugin)
  cfg.addPlugin(pluginBundle)
  cfg.addPlugin(pluginSyntaxHighlight, {
    templateFormats: ['md'],
  })
}

const strayInit11tyTansform = (cfg) => {
  if (process.env.REACT_APP === 'production') {
    cfg.addTransform('async-htmlmin', async (content, outputPath) => {
      if (outputPath.toLowerCase().endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        })
      } else {
        return content
      }
    })
  }
}
