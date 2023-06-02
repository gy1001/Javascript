function Grandpa() {}

function Parent() {}
Parent.prototype = new Grandpa()

function Child() {}
Child.prototype = new Parent()

var child = new Child()

var log = console.log
//  2 + 3
log(child.__proto__.__proto__.__proto__.__proto__.__proto__)

console.log(child.__proto__ === Child.prototype)
console.log(child.__proto__.__proto__ === Parent.prototype)
console.log(child.__proto__.__proto__.__proto__ === Grandpa.prototype)
console.log(child.__proto__.__proto__.__proto__.__proto__ === Object.prototype)
