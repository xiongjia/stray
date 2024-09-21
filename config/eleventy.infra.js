const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')

const {
  strayFilterHtmlDateString,
  strayFilterReadableDate,
} = require('./eleventy.filter.js')

const { strayInit11tyEvent } = require('./eleventy.evt.js')
const { strayInit11tyPlugins } = require('./eleventy.plugins.js')
const { strayInit11tyTansform } = require('./eleventy.tran.js')
const { strayLog } = require('./misc.js')

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
  strayInit11tyEvent,
}
