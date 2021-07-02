"use strict";
// 类的简介
class Person {
    // readonly 只读属性
    constructor() {
        // 直接定义的属性是实例属性，需要通过对象实例进行访问
        this.name = "孙悟空";
        this.age = 18;
    }
}
// 在属性前面使用 static 关键字可以定义类属性(静态属性)
Person.gender = 1; // 静态属性只能类调用，不能示例调用
const per = new Person();
console.log(per.name);
// abstract 放在一个类的前面说明这个类是抽象类
// 抽象类和其他类的区别不大，知识不能被用来实例化
// 也就是说抽象类只能用来被继承
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const obj = { name: '123', age: 19 };
const obj1 = { name: '123', age: 19, gender: '11' };
class myClass {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log("hello");
    }
}
class MyPerson {
    constructor(name, age) {
        this._age = age;
        this._name = name;
    }
    //getName(){
    //  return this._name 
    //}
    //setName(name:string){
    //  this._name = name
    //}
    // 还有一种方法类设置和获取属性
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
}
const per1 = new MyPerson("孙悟空", 18);
// 泛型
// 在定义函数或者类的时候，如果遇到类型不明确的时候就可以使用泛型
function fn(a) {
    return a;
}
fn(10); // 调用时候才确定 泛型 T 为 number 类型，返回值也为 number 类型
fn("10"); // 调用时候才确定 泛型 T 为 string 类型，返回值也为 string 类型
let result = fn("10"); // 指定泛型
// 泛型可以同时指定多个
function fn2(a, b) {
    console.log(b);
    return a;
}
fn2(1, "hello");
// T extends Inter 表示泛型 T 必须继承 MyInter 实现类（子类）
function fn3(a) {
    return a.length;
}
console.log(fn3(1)); // 报错。
console.log(fn3("1111")); // 正确
console.log(fn3({ name: 'ee3ee' })); // 报错
console.log(fn3({ length: 111 })); // 正确
// 类也可以用泛型
class OtherClass {
    constructor(name) {
        this.name = name;
    }
}
let ani = new OtherClass("孙悟空");
