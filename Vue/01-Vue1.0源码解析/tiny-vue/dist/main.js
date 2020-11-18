/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 666:
/***/ ((module) => {

module.exports = {
  text: '我是home1111'
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
"use strict";
// 把index.html的文字颜色改为红色
;
const { text } = __webpack_require__(666);
const home_text = __webpack_require__(666)
const text_p = document.getElementById('text-p');
text_p.innerHTML = home_text.text
})();

/******/ })()
;
//# sourceMappingURL=main.js.map