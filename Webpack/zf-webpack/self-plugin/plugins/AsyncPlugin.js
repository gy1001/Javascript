class AsyncPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, callback) => {
      // 模拟异步操作
      setTimeout(() => {
        console.log('异步插件执行了')
        callback()
      }, 1000)
    })

    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      // 模拟异步操作
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('异步promise插件执行了')
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = AsyncPlugin
