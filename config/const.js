const path = require('node:path')

const strayBuildConf = {
  root: path.join(__dirname, '..'),
  dist: path.join(__dirname, '../dist'),
  contentRoot: path.join(__dirname, '../content'),
  pathContent: 'content',
  pathInclude: 'includes',
  pathData: 'data',
  pathDist: 'dist',
  // Print warring message is the output file size >= 500k
  warningFileSize: 500 * 1024,

  makeRootPath: (subPath) => path.join(strayBuildConf.root, subPath),
  makeDistPath: (subPath) => path.join(strayBuildConf.dist, subPath),
  makeContentPath: (subPath) => path.join(strayBuildConf.contentRoot, subPath),
  makeIncludesPath: (subPath) =>
    path.join(strayBuildConf.contentRoot, strayBuildConf.pathInclude, subPath),
}

module.exports = {
  strayBuildConf,
}
