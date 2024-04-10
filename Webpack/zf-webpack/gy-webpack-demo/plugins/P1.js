class P1 {
  constructor() {}
  apply(compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log('p1 emit apply')
    })
  }
}

module.exports = P1
