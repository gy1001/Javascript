// 自执行函数
!(function (modules) {
  const installModules = {}
  function __gy__require__(moduleId) {
    // 是否缓存
    if (installModules[moduleId]) {
      return installModules[moduleId].exports
    }
    let module = (installModules[moduleId] = {
      exports: {}
    })
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __gy__require__
    )
    return module.exports
  }
  // 入口
  return __gy__require__('./src/index.js')
})({
  './src/index.js': function (module, exports, __gy__require__) {
    eval(
      'var obj = __gy__require__("./src/main.js")\nconsole.log(obj.add(2, 3))\n'
    )
  },
  './src/main.js': function (module, exports, __gy__require__) {
    eval(
      'var clAge = __gy__require__("./src/common/util.js")\nconsole.log(clAge(30))\nmodule.exports = {\n  add: function (a, b) {\n    return a + b\n  }\n}\n'
    )
  },
  './src/common/util.js': function (module, exports, __gy__require__) {
    eval('module.exports = age => {\n  console.log(`你今年${age}岁了`)\n}\n')
  }
})
