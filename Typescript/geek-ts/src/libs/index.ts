import $ from 'jquery'
$(".app").css("color","red")

globalLib({x:1}) // 这里报错：找不到 globalLib 需要增加一个同名声明文件 global-lib.d.ts
globalLib.doSomething()

import moduleLib from "./module-lib"
moduleLib({x:"moduleLib"})
moduleLib.doSomething()

import umdLib from "./umd-lib"
umdLib.doSomething()

import m from "moment"
// 为一些第三方库添加方法
declare module "moment"{
  export function myFunction(): void
}
m.myFunction = ()=>{}

// 还可以给全局变量添加方法
declare global{
  namespace globalLib {
    function doAnything():void
  }
}
// 一般不建议这样做，因为对全局命名空间做了一定污染
globalLib.doAnything = () => {}


// 查看jq的声明文件可以看到 它引用了众多文件
// 查看node_modules @types/jquery 下的package.json 中的type 选项 指向了声明文件的入口
//  内容如下
/// <reference types="sizzle" />  // type 表示模块依赖
/// <reference path="JQueryStatic.d.ts" /> // path 表示路径文件依赖
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />

//export = jQuery;