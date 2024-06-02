const htmlmin = require('html-minifier')

module.exports = (eleventyConfig) => {


  return {
		templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",

    dir: {
			input: "content",
			includes: "includes",
			output: "dist"
		}
  }
}
