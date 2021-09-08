
      (function(objectGraph){
        // require 目的： 加载入口文件
        function require(module){

          // eval(objectGraph[module].code)
          
          // 定义模块内部的 require 函数
          function localRequire(relativePath){
            // 引入当前模块的绝对路径，通过require 加载
            return require(objectGraph[module].deps[relativePath])
          }

          // 定义暴露对象，(将来我们模块要暴露的内容)
          var exports = {};

          (function (require, exports, code){
            eval(code)
          })(localRequire, exports, objectGraph[module].code)

          // 作为 requires 函数的返回值返回出去
          // 使后面的 require 函数能得到暴露的内容
          return exports
        }

        // 加载入口文件
        require('./src/index.js');


      })({"./src/index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _count = _interopRequireDefault(require(\"./count.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(3, 1));","deps":{"./add.js":"/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/add.js","./count.js":"/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/count.js"}},"/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction add(x, y) {\n  return x + y;\n}\n\nvar _default = add;\nexports[\"default\"] = _default;","deps":{}},"/Users/gaoyuan/learn/Javascript/Webpack/mini-webpack/src/count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction count(x, y) {\n  return x - y;\n}\n\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})
    