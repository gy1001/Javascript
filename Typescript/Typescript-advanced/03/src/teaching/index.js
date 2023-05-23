'use strict'
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var argsnum = arguments.length,
      atargetInfo =
        argsnum < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      decorator
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') {
      atargetInfo = Reflect.decorate(decorators, target, key, desc)
    } else {
      for (var i = decorators.length - 1; i >= 0; i--) {
        if ((decorator = decorators[i])) {
          atargetInfo =
            (argsnum < 3
              ? decorator(atargetInfo)
              : argsnum > 3
              ? decorator(target, key, atargetInfo)
              : decorator(target, key)) || atargetInfo
        }
      }
    }
    return (
      argsnum > 3 &&
        atargetInfo &&
        Object.defineProperty(target, key, atargetInfo),
      atargetInfo
    )
  }
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v)
  }
function FirstClassDecorator(targetClass) {
  var targetClassObj = new targetClass()
  targetClassObj.buy()
}
var CustomerService = /** @class */ (function () {
  function CustomerService() {
    this.name = '下单'
  }
  CustomerService.prototype.buy = function () {
    console.log(this.name + '购买')
  }
  CustomerService.prototype.placeOrder = function () {
    console.log(this.name + '下单购买')
  }
  CustomerService = __decorate(
    [FirstClassDecorator, __metadata('design:paramtypes', [])],
    CustomerService,
  )
  return CustomerService
})()
