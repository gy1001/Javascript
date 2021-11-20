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
  return __gy__require__('__entry__')
})({ __module__content__ })
