## 数据响应式
> 上帝的钥匙 Object.defineProperty

## 实现数组的响应式
> 被改写的方法：push pop shift unshift splice sort reverse
> const arrayMethods = Array.prototype
> Object.setPrototypeOf(o, arrayMethods)
> o.__proto__ = arrayMethods 

