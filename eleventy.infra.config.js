const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')

const pluginNavigation = require('@11ty/eleventy-navigation')
const pluginBundle = require('@11ty/eleventy-plugin-bundle')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const {
  strayFilterHtmlDateString,
  strayFilterReadableDate,
} = require('./eleventy.filter.config.js')

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

const strayInit11tyFilter = (cfg) => {
  cfg.addFilter('readableDate', strayFilterReadableDate)
  cfg.addFilter('htmlDateString', strayFilterHtmlDateString)
}

const strayInit11tyLib = (cfg) => {
  const mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItEmoji.full)
  cfg.setLibrary('md', mdIt)
}

module.exports = {
  strayLog,
  strayInit11tyPlugins,
  strayInit11tyTansform,
  strayInit11tyFilter,
  strayInit11tyLib,
}
