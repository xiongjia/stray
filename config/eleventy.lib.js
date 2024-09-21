const strayInit11tyLib = (cfg) => {
  const markdownIt = require('markdown-it')
  const markdownItEmoji = require('markdown-it-emoji')

  const mdIt = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItEmoji.full)
  cfg.setLibrary('md', mdIt)
}

module.exports = {
  strayInit11tyLib,
}
