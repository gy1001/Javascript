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
