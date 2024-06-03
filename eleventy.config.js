const htmlmin = require('html-minifier')

const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = (cfg) => {
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

  cfg.addPlugin(pluginNavigation);

  return {
		templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

    dir: {
			input: "content",
			includes: "_includes",
      data: "_data",
			output: "dist"
		}
  }
}
