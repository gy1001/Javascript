var name = "The Window";

var object = {
	name: "My Object",

	getNameFunc: function() {
		this.name = "mine";
		return function() {
			return this.name;
		};
	}
};

console.log(object.getNameFunc()());
console.log(object.name)

var name = "The Window";

var object = {
	name: "My Object",

	getNameFunc: function() {
		var that = this;
		return function() {
			return that.name;
		};

	}

};

console.log(object.getNameFunc()());



function f1() {

	var n = 999;

	function f2() {
		console.log(n); // 999
	}

}

function f1() {

	var n = 999;

	function f2() {
		console.log(n);
	}

	return f2;

}

var result = f1();

result(); // 999



// 1	1	2	3
// 第n项是第n-1和n-2的和，开始的两项为1

var count1 = 0;
var fib1 = function(n) {
	count1++;
	if (n == 0 || n == 1) {
		return 1;
	}
	return fib1(n - 1) + fib2(n - 2);
};
// fib1(11); // 287
// fib1(12); // 465
//fib1(13); // 753
//console.log(count1);






var count2 = 0;
var fib2 = (function() {
	var arr = [1, 1];//斐波那契数列
	return function(n) {
		count2++;
		var res = arr[n];
		if (res) {
			return res;
		} else {
			arr[n] = fib2(n - 1) + fib2(n - 2);
			return arr[n];
		}
	};

})();

/*
for (var i = 0; i < 10; i++) {
	console.log(fib1(i) + "," + fib2(i));
}
*/

// fib1(11); // 287次
fib2(11); // 21次
// fib1(12); // 465次
fib2(12); // 24	次
//console.log(count1);
console.log(count2);



var loadEvent = function(fn) {
	var oldFn = window.onload;
	if (typeof oldFn === "function") {
		window.onload = function() {
			oldFn();
			fn();
		};
	} else {
		window.onload = fn;
	}
};




var jkLoad = (function() {
	var events = {};
	var func = function() {
		window.onload = function() {
			for (var i in events) {
				events[i]();
			}
		};
	};
	return {
		add: function(name, fn) {
			events[name] = fn;
			func();
		},
		remove: function(name) {
			delete events[name];
			func();
		}
	};
})();


jkLoad.add("f1", function() {
	// 执行代码1
});

jkLoad.add("f2", function() {
	// 执行代码1
});

jkLoad.remove("f1");



var Person = function(name, age, sex) { // 闭包，外部不可以修改
	return {
		get_Name: function() {
			return name;
		},
		set_Name: function(value) { // 非闭包，外部可以修改
			name = value;
		},
		get_Age: function() {
			return age;
		},
		get_Sex: function() {
			return sex;
		}
	}
};

var p = Person("小宅", 19, "女");
console.log(p.get_Name()); // 闭包


p.set_Name("xiaozhai");
console.log(p.get_Name()); // 非闭包



// 作用域的问题
var x = [1,2,3]
var y = [4,5,6]
~function(x){
  x.push("a")
  x[0]='wo'
  x=y;
  y[1] = "mine"
  console.log(x,y)
}(x)
console.log(x,y)


var x1=10;
(function(){
  x1 = x1+1;
  console.log(x1)
})()
console.log(x1)



// var a = 0;
// if(true){
// 	console.log(a,window.a);// 函数提升，是块级作用域，输出 function a 和 0
//     a = 1;  // 取作用域最近的块级作用域的 function a ,且被重置为 1了，本质又是一个 变量的赋值。
//     console.log(a,window.a);// a 是指向块级作用域的 a, 输出 1 和 0 
//     function a(){} // 函数的声明，将执行函数的变量的定义同步到函数级的作用域。
//     console.log(a,window.a);// 输出 1 和 1
//     a = 21; // 仍然是函数定义块级作用域的 a ,重置为 21
//     console.log(a,window.a); // 输出为函数提升的块级作用域的 a, 输出 21，1
//     console.log("里面",a);
// }
// console.log("外部",a);



var a = 0;
if(true){
    a = 1;  
    function a(){} 
    console.log("里面",a);
}
console.log("外部",a);




setTimeout(function () {
  new Promise(function (resolve, reject) {
    console.log('异步宏任务promise');
    resolve();
  }).then(function () {
    console.log('异步微任务then')
  })
  console.log('异步宏任务');
}, 0)

new Promise(function (resolve, reject) {
  console.log('同步宏任务promise');
  resolve();
}).then(function () {
  console.log('同步微任务then')
})
console.log('同步宏任务')



function b(){
  console.log(3)
  return new Promise((resolve)=>{
    resolve()
  })
}

// async function (){
//   console.log(1);
//   setTimeout(function(){console.log(2)},0)
//   const a = await b()
// }




// var a = 0;
// if(true){
//   function a(){} 
//   console.log("里面",a);
// }
// console.log("外部",a);



// a = 0;
// function b() {
//   function a() {
//     a = 11
//   }
//   console.log("里面", a);
// }
// b()
// console.log("外部", a);





console.log("-----------------------------")
a = 0;
function b() {
  a = 12;
  if(true){
    a = 11
    function a() { }
    console.log(a, window.a) // 11，12
    console.log("最里面", a); // 11
  }
  console.log('里面', a)
}
a = 12
b()
console.log("外部", a); // 12
console.log(a, window.a)
console.log("-----------------------------")

// const obj1 = {
// 	a:{
// 		b:{
// 			c:{
//         m: 1
//       },
//       n: 2
//     },
//     d:{
//       x: 2
//     }
//   },
//   b: {
//     m: 999
//   }
// }

// const obj2 = {
//   a: 2,
//   b: 2
// }

// console.log(1222222)
// console.log(findKeyValue('a', 2, obj2))

var Foo1 = function (f){}
var o = {}
let foo1 =  new Foo1()
console.log(foo1.constructor)



// for (var index = 0; index < (5,6,7,8,9,10); index++) {
// 	console.log(index)
// }


function test(){
	"use strict"
	console.log(arguments)
	arguments[1] = 2;
	console.log(arguments)
	console.log(arguments[0]+arguments[1])
}
console.log("------------------------")
test(1)
console.log("------------------------")