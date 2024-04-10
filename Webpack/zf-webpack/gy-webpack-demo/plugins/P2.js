class P2 {
  constructor() {}
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('afterPlugin', () => {
      console.log('p2 afterPlugins apply')
    })
  }
}

module.exports = P2
