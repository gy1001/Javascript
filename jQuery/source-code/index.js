;(function (global, factory) {
  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // 对于 CommonJS 和 类似 CommonJS 的环境，其中有一个属性 window ,执行工厂函数然后获得 jQuery
    //  对于一些没有 document 的 window （例如 nodejs），将通过 module.exports 暴露一个 factory
    // 这个需要创建一个真的 window ，例子 var jQuery = require("jquery")(window);
    module.exports = global.document
      ? factory(global, true)
      : function (w) {
          if (!w.document) {
            throw new Error('jQuery requires a window with a document')
          }
          return factory(w)
        }
  } else {
    factory(global)
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
  console.log('我是factory函数')
  //...
  var version = '3.6.0',
    jQuery = function () {}
  if (typeof noGlobal === 'undefined') {
    window.jQuery = window.$ = jQuery
  }

  return jQuery
})
