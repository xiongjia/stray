const htmlMinify = (content, outputPath) => {
  if (!outputPath.toLowerCase().endsWith('.html')) {
    return content
  }
  const htmlmin = require('html-minifier')
  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
  })
}

const strayInit11tyTansform = (cfg) => {
  cfg.addTransform('async-htmlmin', async (content, outputPath) => {
    return htmlMinify(content, outputPath)
  })
}

module.exports = {
  strayInit11tyTansform,
}
