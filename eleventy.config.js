const fs = require('node:fs')
const path = require('node:path')

const htmlmin = require('html-minifier')

const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const postcssAutoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const postcssPurgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')
const cssMqpacker = require('css-mqpacker')
const cssnano = require('cssnano')

const pluginNavigation = require("@11ty/eleventy-navigation")
const pluginBundle = require("@11ty/eleventy-plugin-bundle")
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = (cfg) => {

  strayInit11tyTansform(cfg)
  strayInit11tyPlugins(cfg)
  cfg.on("eleventy.after", async ({ dir, runMode, outputMode }) => {
    strayPostcss()
  })

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

strayLog = (data) => {
  console.log(`[stray] ${data}`)
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

const strayInit11tyPlugins = (cfg) => {
  cfg.addPlugin(pluginNavigation)
  cfg.addPlugin(EleventyHtmlBasePlugin)
	cfg.addPlugin(pluginBundle)
  cfg.addPlugin(pluginSyntaxHighlight, {
    templateFormats: ["md"]
  })
}

const strayPostcss = () => {
  const cssEntry = path.join(__dirname, 'content/_includes/style/stray.css')
  strayLog(`Postcss input ${cssEntry}`)

  const cssDist = path.join(__dirname, 'dist/bundle.css')
  const cssMapDist = path.join(__dirname, 'dist/bundle.css.map')

  plugins = [
    postcssAutoprefixer,
    postcssNested,
    postcssImport,
    tailwindcss({
      content: ["./dist/**/*.html"]
    }),
    postcssPurgecss({
      content: ["./dist/**/*.html"]
    }),
    cssMqpacker,
    cssnano
  ]
  fs.readFile(cssEntry, (err, css) => {
    if (err) {
      strayLog(`Load css ${css} failed ${err}`)
      throw err
    }

    postcss(plugins)
      .process(css, {
        SourceMap: {inline: true}
      }).then(result => {
        fs.writeFile(cssDist, result.css, () => true)
        if (result.map) {
          fs.writeFile(cssMapDist, result.map.toString(), () => true)
        }
      })
  })
}