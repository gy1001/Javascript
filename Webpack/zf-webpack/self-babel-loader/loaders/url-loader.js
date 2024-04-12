const fileLoader = require('./file-loader')
var mime = require('mime-types')

function urlLoader(source) {
  const { limit } = this.query
  if (limit && limit > source.length) {
    return `module.exports="data:${mime.lookup(
      this.resourcePath,
    )};base64,${source.toString('base64')}"`
  }
  return fileLoader.call(this, source)
}
urlLoader.raw = true
module.exports = urlLoader
